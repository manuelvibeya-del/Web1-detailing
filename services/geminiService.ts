import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client. API_KEY is injected by the environment.
// Note: For Veo and High-Res Image Gen, we re-instantiate with the user-selected key if needed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Chat Service ---
export const createChatSession = async (history: { role: string; parts: { text: string }[] }[] = []) => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are an expert car detailing assistant for 'Latino Shine'. You speak both Spanish and English fluently. You help customers understand car care, ceramic coatings, and maintenance. You are professional, friendly, and concise.",
    },
    history: history as any, // Cast to any to satisfy the type if there's a minor mismatch in SDK versions
  });
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  const result = await chat.sendMessage({ message });
  return result.text || "Sorry, I couldn't generate a response.";
};

// --- Image Analysis Service ---
export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, or detect from file
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
    });
    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Analysis failed", error);
    throw error;
  }
};

// --- Image Generation Service (Gemini 3 Pro Image) ---
export const generateImage = async (prompt: string, size: "1K" | "2K" | "4K"): Promise<string | null> => {
  // Ensure Key Selection for High-Res/Pro models
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
        throw new Error("API_KEY_REQUIRED");
    }
  }

  // Re-init with potentially new key (handled by the SDK internally if environment matches, 
  // but best practice for these specific paid features in this environment context is often to just rely on the env injection)
  // However, the prompt instructions say "Create a new GoogleGenAI instance right before making an API call".
  const secureAi = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await secureAi.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        imageSize: size,
        aspectRatio: "1:1" // Default square
      }
    }
  });

  // Extract image
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};

// --- Video Generation Service (Veo) ---
export const generateVideo = async (imageBytes: string, prompt: string, aspectRatio: '16:9' | '9:16' = '16:9'): Promise<string | null> => {
   // Ensure Key Selection for Veo
   if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
        throw new Error("API_KEY_REQUIRED");
    }
  }

  const secureAi = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 1. Start Operation
  let operation = await secureAi.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: {
      imageBytes: imageBytes,
      mimeType: 'image/jpeg', // Assuming jpeg input
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio,
    }
  });

  // 2. Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
    operation = await secureAi.operations.getVideosOperation({ operation: operation });
  }

  // 3. Get Result URI
  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  
  if (!videoUri) return null;

  // 4. Fetch the actual video bytes using the key
  const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
};

// --- Helper: File to Base64 ---
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};
