import React from 'react';
import { Zap, UploadCloud, BarChart3, ShieldCheck } from 'lucide-react';

const featureList = [
  {
    icon: Zap,
    title: 'Fast Analysis',
    description: 'Get rapid prediction results within seconds, engineered for immediate feedback and high throughput.',
  },
  {
    icon: UploadCloud,
    title: 'Simple Upload',
    description: 'Drag, drop, and analyze. Seamless support for JPG, PNG, and WEBP formats without extra steps.',
  },
  {
    icon: BarChart3,
    title: 'Confidence Score',
    description: 'Understand how strongly the model supports its prediction with clear, transparent probability metrics.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy Focused',
    description: 'Images are processed for detection analysis and are not permanently retained or shared.',
  },
];

export default function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <span>Capabilities</span>
          </div>
          <h2 className="section-title">Designed for Precision & Clarity</h2>
          <p className="section-desc">
            Everything you need to inspect and verify digital imagery in an intuitive, distraction-free interface.
          </p>
        </div>

        <div className="features-grid">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Icon size={22} className="feature-icon" />
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
