import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, Sparkles } from 'lucide-react';

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];



export default function ImageUploader({
  selectedFile,
  previewUrl,
  onFileSelect,
  onFileRemove,
  onAnalyze,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const validateAndSelect = (file) => {
    setErrorMsg('');
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMsg('Unsupported format. Please upload JPG, JPEG, PNG, or WEBP.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMsg(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is ${MAX_SIZE_MB} MB.`);
      return;
    }
    onFileSelect(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) validateAndSelect(e.dataTransfer.files[0]);
  };
  const handleFileInputChange = (e) => {
    if (e.target.files?.length > 0) validateAndSelect(e.target.files[0]);
  };


  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="uploader-container">
      <input
        ref={fileInputRef}
        type="file"
        id="file-upload-input"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {errorMsg && (
        <div className="upload-error-banner" role="alert">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {!selectedFile ? (
        <>
          <div
            className={`dropzone-card ${isDragging ? 'dropzone-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            tabIndex={0}
            role="button"
            aria-label="Upload an image by dropping or clicking"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
          >
            <div className="dropzone-icon-plate">
              <UploadCloud size={32} />
            </div>
            <div className="dropzone-text-group">
              <h3 className="dropzone-title">Drop your image here</h3>
              <span className="dropzone-sub">or</span>
              <button type="button" className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                Browse from your device
              </button>
            </div>
            <div className="dropzone-footer-specs">
              <span>JPG · JPEG · PNG · WEBP</span>
              <span className="spec-dot">•</span>
              <span>Max 10 MB</span>
            </div>
          </div>

        </>
      ) : (
        <div className="selected-image-card">
          <div className="preview-container">
            <img src={previewUrl} alt="Selected preview" className="preview-image" />
            <button onClick={onFileRemove} className="remove-btn" aria-label="Remove image" title="Remove image">
              <X size={18} />
            </button>
          </div>
          <div className="selected-meta">
            <div className="meta-info">
              <div className="file-name" title={selectedFile.name}>
                <ImageIcon size={18} className="meta-icon" />
                <span>{selectedFile.name}</span>
              </div>
              <div className="file-size">{formatFileSize(selectedFile.size)}</div>
            </div>
            <div className="action-row">
              <button type="button" onClick={onFileRemove} className="btn btn-outline btn-sm">Change Image</button>
              <button type="button" onClick={onAnalyze} className="btn btn-primary analyze-action-btn">
                <Sparkles size={18} />
                <span>Analyze Image</span>
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
