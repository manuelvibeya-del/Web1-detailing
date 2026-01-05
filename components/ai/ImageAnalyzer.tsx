import React, { useState } from 'react';
import { Upload, Search, Loader2, AlertCircle } from 'lucide-react';
import { analyzeImage, fileToBase64 } from '../../services/geminiService';

const ImageAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const base64 = await fileToBase64(file);
      setPreview(`data:image/jpeg;base64,${base64}`); // Add prefix for display
      setAnalysis('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const base64 = await fileToBase64(selectedFile);
      const result = await analyzeImage(
        base64, 
        "Analyze this car image. Identify the car model (if possible), the condition of the paint, any visible dirt or damage, and recommend specific detailing services (like wax, clay bar, interior cleaning) that Latino Shine should perform. Answer in Spanish."
      );
      setAnalysis(result);
    } catch (err) {
      setAnalysis("Error al analizar la imagen. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
        <Search className="mr-3 text-purple-500" />
        Analizador de Vehículos IA
      </h2>
      <p className="text-gray-400 mb-8">Sube una foto de tu auto y nuestra IA te recomendará los mejores servicios.</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-700 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 transition-colors relative overflow-hidden group">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-contain z-10" />
            ) : (
              <div className="text-center p-4">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Haz clic para subir foto</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : 'Analizar Vehículo'}
          </button>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Resultados del Análisis</h3>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              <p className="text-gray-400 text-sm animate-pulse">Analizando pintura y condiciones...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-invert prose-sm">
              <p className="whitespace-pre-wrap text-gray-300">{analysis}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
              <p>Sube una foto y analiza para ver resultados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;