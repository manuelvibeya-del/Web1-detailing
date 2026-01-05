import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { createChatSession, sendMessageToChat } from '../../services/geminiService';
import { Chat } from '@google/genai';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente de Latino Shine. ¿En qué puedo ayudarte hoy con tu auto?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
        const session = await createChatSession();
        setChatSession(session);
    };
    initChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await sendMessageToChat(chatSession, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, tuve un problema al procesar tu solicitud.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mt-20">
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center">
        <Bot className="text-purple-500 mr-2" />
        <h3 className="text-white font-bold">Asistente Virtual Latino Shine</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-gray-200 rounded-bl-none'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none">
               <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;