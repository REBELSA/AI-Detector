import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';

export default function AnalysisLoader({ previewUrl }) {
  const [progress, setProgress] = useState(15);
  const [stage, setStage] = useState('Extracting tensor features…');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStage('Analyzing frequency artifacts…');
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(78);
      setStage('Evaluating generative noise patterns…');
    }, 1100);

    const timer3 = setTimeout(() => {
      setProgress(95);
      setStage('Computing classification confidence…');
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="analysis-loader-card">
      {/* Visual Analysis Scanner */}
      <div className="loader-visual-plate">
        <div className="loader-image-wrapper">
          {previewUrl && <img src={previewUrl} alt="Analyzing preview" className="loader-bg-image" />}
          <div className="loader-scan-beam"></div>
          
          {/* Subtle concentric pulsing circles */}
          <div className="concentric-ring ring-outer"></div>
          <div className="concentric-ring ring-inner"></div>
          <div className="loader-center-badge">
            <Cpu size={24} className="loader-cpu-icon" />
          </div>
        </div>
      </div>

      {/* Text Status */}
      <div className="loader-status-text">
        <h3 className="loader-heading">Analyzing Image</h3>
        <p className="loader-subtext">Examining visual patterns…</p>
        <span className="loader-stage-indicator">{stage}</span>
      </div>

      {/* Minimal Progress Bar */}
      <div className="loader-progress-track">
        <div 
          className="loader-progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
