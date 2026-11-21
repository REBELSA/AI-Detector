import React from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default function PredictionResult({ result, previewUrl, onReset }) {
  if (!result) return null;

  const isAI = result.prediction.toLowerCase().includes('ai');
  const confidence = result.confidence || 0;
  const displayLabel = isAI ? 'AI Generated' : 'Real Image';

  const totalBlocks = 20;
  const filledBlocks = Math.round((confidence / 100) * totalBlocks);

  return (
    <div className={`result-card ${isAI ? 'result-ai' : 'result-real'}`}>
      <div className="result-header">
        <div className={`result-badge ${isAI ? 'badge-ai' : 'badge-real'}`}>
          {isAI ? (
            <><AlertTriangle size={16} /><span>Synthetic Patterns Detected</span></>
          ) : (
            <><CheckCircle2 size={16} /><span>Natural Artifacts Verified</span></>
          )}
        </div>
        {result.isMock && (
          <span className="mock-pill" title="Development simulation">Dev Mock</span>
        )}
      </div>

      <div className="result-body-layout">
        <div className="result-thumbnail-col">
          <div className="thumbnail-frame">
            <img src={previewUrl} alt="Analyzed image" className="thumbnail-img" />
            <div className="thumbnail-overlay-tag">{isAI ? 'AI Flagged' : 'Organic'}</div>
          </div>
        </div>

        <div className="result-data-col">
          <div className="prediction-headline">
            <span className="prediction-sub">Detection Result</span>
            <h2 className="prediction-title">{displayLabel}</h2>
          </div>

          <div className="confidence-block">
            <div className="confidence-header">
              <span className="confidence-label">Confidence Score</span>
              <span className={`confidence-val ${isAI ? 'val-ai' : 'val-real'}`}>{confidence.toFixed(1)}%</span>
            </div>
            <div className="confidence-meter-container">
              <div className="confidence-meter-track">
                <div className={`confidence-meter-bar ${isAI ? 'bar-ai' : 'bar-real'}`} style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}></div>
              </div>
              <div className="block-meter-repr" aria-hidden="true">
                <span className="block-filled">{'█'.repeat(filledBlocks)}</span>
                <span className="block-empty">{'░'.repeat(totalBlocks - filledBlocks)}</span>
                <span className="block-percent"> {confidence.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="neural-metrics-row">
            <div className="metric-chip">
              <span className="chip-label">Surface Coherence</span>
              <span className="chip-state">{isAI ? 'Synthetic' : 'Authentic'}</span>
            </div>
            <div className="metric-chip">
              <span className="chip-label">Spectral Noise</span>
              <span className="chip-state">{isAI ? 'Diffusion Trace' : 'Camera Sensor'}</span>
            </div>
            <div className="metric-chip">
              <span className="chip-label">Model Target</span>
              <span className="chip-state">Binary Softmax</span>
            </div>
          </div>
        </div>
      </div>

      <div className="result-actions">
        <button type="button" onClick={onReset} className="btn btn-primary btn-lg reset-btn">
          <RotateCcw size={18} />
          <span>Analyze Another Image</span>
        </button>
      </div>

      <div className="result-disclaimer">
        <Info size={14} className="disclaimer-icon" />
        <p>AI detection is probabilistic. Results should be treated as an indication rather than definitive proof of an image's origin.</p>
      </div>
    </div>
  );
}
