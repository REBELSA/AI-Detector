import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import AnalysisLoader from './AnalysisLoader';
import PredictionResult from './PredictionResult';
import { predictImage } from '../services/predictionService';

export default function UploadSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  const handleFileSelect = (file) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPredictionResult(null);
    setAnalysisError('');
  };

  const handleFileRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setPredictionResult(null);
    setAnalysisError('');
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisError('');
    try {
      const result = await predictImage(selectedFile);
      setPredictionResult(result);
    } catch (err) {
      console.error('Prediction failed:', err);
      setAnalysisError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="analyze-section" className="section upload-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag"><span>Detection Engine</span></div>
          <h2 className="section-title">Analyze an Image</h2>
          <p className="section-desc">Upload an image to check whether it is likely AI-generated or human-created.</p>
        </div>

        <div className="upload-workflow-wrapper">
          {analysisError && (
            <div className="general-error-card">
              <p>{analysisError}</p>
              <button onClick={() => setAnalysisError('')} className="btn btn-outline btn-sm">Dismiss</button>
            </div>
          )}

          {isAnalyzing ? (
            <AnalysisLoader previewUrl={previewUrl} />
          ) : predictionResult ? (
            <PredictionResult result={predictionResult} previewUrl={previewUrl} onReset={handleFileRemove} />
          ) : (
            <ImageUploader
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              onAnalyze={handleStartAnalysis}
            />
          )}
        </div>
      </div>
    </section>
  );
}
