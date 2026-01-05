import React, { useState } from 'react';
import { Play, Upload, Loader2, Key, Film } from 'lucide-react';
import { generateVideo, fileToBase64 } from '../../services/geminiService';

const VideoGenerator: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const base64 = await fileToBase64(file);
      setPreview(`data:image/jpeg;base64,${base64}`);
      setVideoUrl(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setStatus('Iniciando generación de video (Veo)...');
    
    try {
      const base64 = await fileToBase64(selectedFile);
      // Wait loop is inside the service
      const url = await generateVideo(base64, "Cinematic shot, the car is driving fast on a highway, neon lights reflection, high quality", "16:9");
      if (url) {
        setVideoUrl(url);
      } else {
        setError("Falló la generación del video.");
      }
    } catch (err: any) {
        if (err.message === "API_KEY_REQUIRED" && window.aistudio) {
            try {
               await window.aistudio.openSelectKey();
               setError("Llave API seleccionada. Por favor intenta de nuevo.");
            } catch (keyErr) {
               setError("Fallo al seleccionar la llave API.");
            }
         } else {
           setError("Error generando el video. Intenta de nuevo.");
           console.error(err);
         }
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Film className="mr-3 text-purple-500" />
            Animador de Autos (Veo AI)
        </h2>
        <p className="text-gray-400 mb-8">
            Sube una foto de tu auto y conviértela en un video cinemático en movimiento.
            <br/>
            <span className="text-xs text-purple-400">*Powered by Google Veo. Requiere llave API pagada.</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="border-2 border-dashed border-slate-700 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 transition-colors relative overflow-hidden">
                    {preview ? (
                        <img src={preview} alt="Source" className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-center p-4">
                            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-400">Sube la foto de tu auto</p>
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={!selectedFile || loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex justify-center items-center"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <span className="flex items-center"><Play className="w-4 h-4 mr-2" /> Generar Video</span>}
                </button>
                {status && <p className="text-sm text-purple-400 animate-pulse text-center">{status}</p>}
                {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex items-center justify-center min-h-[300px]">
                {videoUrl ? (
                    <video controls autoPlay loop className="w-full rounded-lg shadow-2xl">
                        <source src={videoUrl} type="video/mp4" />
                        Tu navegador no soporta video.
                    </video>
                ) : (
                    <div className="text-center text-gray-500">
                        <Film className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>El video generado aparecerá aquí.</p>
                        <p className="text-xs mt-2 opacity-50">El proceso puede tomar unos minutos.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default VideoGenerator;