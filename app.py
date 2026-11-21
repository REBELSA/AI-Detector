import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'ai_image_detector.keras'
if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)
else:
    model = None

IMG_SIZE = (160, 160)

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
        
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image selected'}), 400
        
    temp_path = 'temp_image.jpg'
    file.save(temp_path)
    
    try:
        img_raw = tf.io.read_file(temp_path)
        img_tensor = tf.io.decode_image(img_raw, channels=3, expand_animations=False)
        img_tensor = tf.image.resize(img_tensor, IMG_SIZE)
        img_array = tf.expand_dims(img_tensor, 0)
        
        probability = model.predict(img_array, verbose=0)[0][0]
        
        if probability >= 0.5:
            prediction = 'Real'
            confidence = float(probability)
        else:
            prediction = 'AI Generated'
            confidence = float(1.0 - probability)
            
        confidence_percent = round(confidence * 100, 2)
        
        return jsonify({
            'prediction': prediction,
            'confidence': confidence_percent
        })
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
