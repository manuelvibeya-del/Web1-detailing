import React, { useState } from 'react';
import { Image as ImageIcon, Loader2, Key, Download } from 'lucide-react';
import { generateImage } from '../../services/geminiService';
import { ImageSizeOption } from '../../types';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateImage(prompt, size);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("No se pudo generar la imagen. Intenta con otro prompt.");
      }
    } catch (err: any) {
      if (err.message === "API_KEY_REQUIRED" && window.aistudio) {
         try {
            await window.aistudio.openSelectKey();
            // Retry once automatically or prompt user to click again?
            // Let's ask user to click again to be safe and avoid loops
            setError("Llave API seleccionada. Por favor haz clic en Generar nuevamente.");
         } catch (keyErr) {
            setError("Fallo al seleccionar la llave API.");
         }
      } else {
        setError("Error en la generación. Verifica tu llave API.");
      }
    } finally {
      setLoading(false);
    }
  };

  const options: ImageSizeOption[] = [
    { label: "1K Standard", value: "1K" },
    { label: "2K High Res", value: "2K" },
    { label: "4K Ultra Res", value: "4K" }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
       <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
        <ImageIcon className="mr-3 text-purple-500" />
        Diseñador de Estilos (Dream Car)
      </h2>
      <p className="text-gray-400 mb-8">
        Describe el auto de tus sueños o una modificación que quieras visualizar. 
        <br/>
        <span className="text-xs text-purple-400">*Requiere una llave API de Google Cloud pagada para resoluciones altas.</span>
      </p>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Un Ferrari rojo brillante estacionado frente a una mansión moderna al atardecer..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
            <select
                value={size}
                onChange={(e) => setSize(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
        <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-bold shadow-lg transition-all flex justify-center items-center"
        >
            {loading ? <Loader2 className="animate-spin mr-2"/> : 'Generar Diseño'}
        </button>
        {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm flex items-center">
                <Key className="w-4 h-4 mr-2" />
                {error}
            </div>
        )}
      </div>

      {generatedImage && (
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
              <img src={generatedImage} alt="Generated Car" className="rounded-lg shadow-2xl max-h-[500px] w-auto" />
              <a href={generatedImage} download="latino-shine-design.png" className="mt-4 flex items-center text-purple-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4 mr-2"/> Descargar Imagen
              </a>
          </div>
      )}
    </div>
  );
};

export default ImageGenerator;