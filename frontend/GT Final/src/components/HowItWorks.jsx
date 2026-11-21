import React from 'react';
import { Upload, Cpu, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Upload an image you want to analyze in standard formats up to 10 MB.',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'The AI model examines visual patterns, noise artifacts, and frequency characteristics.',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Detect',
    description: 'The system predicts whether the image is likely AI-generated or human-created.',
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section how-it-works-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <span>Workflow</span>
          </div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            A three-step verification process built for clarity, speed, and accuracy.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="step-card">
                <div className="step-card-top">
                  <div className="step-icon-plate">
                    <Icon size={24} className="step-icon" />
                  </div>
                  <span className="step-number">{step.number}</span>
                </div>

                <div className="step-card-body">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
