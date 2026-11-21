/**
 * PixelProof — Model Prediction Service
 * 
 * ARCHITECTURE OVERVIEW:
 * -------------------------------------------------------------
 * 1. Frontend: Collects user-selected image and initiates prediction.
 * 2. API Call: Sends `POST /api/predict` with `multipart/form-data` containing `image`.
 * 3. Python Backend (FastAPI / Flask / Django):
 *    - Receives uploaded image bytes.
 *    - Preprocesses image (resize, normalize pixel tensors).
 *    - Loads TensorFlow / Keras model: `model = tf.keras.models.load_model('model.keras')`.
 *    - Evaluates prediction: `probabilities = model.predict(preprocessed_image)`.
 *    - Returns JSON response:
 *        {
 *          "prediction": "AI Generated" | "Real",
 *          "confidence": 94.7,
 *          "details": { ... } // optional
 *        }
 * 4. Frontend: Renders prediction & confidence badge in <PredictionResult />.
 * -------------------------------------------------------------
 * 
 * NOTE: The TensorFlow/Keras (.keras) model is not integrated yet.
 * In development, `USE_MOCK_SERVICE = true` allows testing the full
 * UI experience with realistic asynchronous latency.
 */

// Toggle this flag when your backend API is ready
export const USE_MOCK_SERVICE = false;

// Backend API configuration
export const API_CONFIG = {
  // Replace with your backend URL when deployed (e.g. http://localhost:8000/api/predict)
  PREDICT_ENDPOINT: 'http://localhost:5000/api/predict',
  TIMEOUT_MS: 30000,
};

/**
 * Main prediction dispatcher. Automatically routes to mock service or
 * live backend API depending on `USE_MOCK_SERVICE`.
 * 
 * @param {File} imageFile - The user selected image File
 * @param {Object} [options] - Optional settings (e.g. forced outcome for dev testing)
 * @returns {Promise<{ prediction: 'AI Generated' | 'Real', confidence: number, analyzedAt: string }>}
 */
export async function predictImage(imageFile, options = {}) {
  if (!imageFile) {
    throw new Error('No image file provided for analysis.');
  }

  if (USE_MOCK_SERVICE) {
    return runMockPrediction(imageFile, options);
  }

  return runLiveAPIPrediction(imageFile);
}

/**
 * Production API call to backend service.
 * Ready for drop-in use when backend is active.
 * 
 * @param {File} imageFile 
 */
async function runLiveAPIPrediction(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);

  try {
    const response = await fetch(API_CONFIG.PREDICT_ENDPOINT, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown server error');
      throw new Error(`Prediction API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // Standardize response contract
    return {
      prediction: data.prediction, // Expected: "AI Generated" or "Real"
      confidence: Number(data.confidence) || 0,
      analyzedAt: new Date().toISOString(),
      raw: data,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Analysis request timed out. Please check backend connection.');
    }
    throw err;
  }
}

/**
 * Mock Prediction Service (For Development & Testing Only)
 * Simulates realistic model processing delay and response structure.
 * 
 * @param {File} imageFile 
 * @param {Object} [options]
 * @param {'AI Generated' | 'Real' | 'random'} [options.forceOutcome]
 */
async function runMockPrediction(imageFile, options = {}) {
  // Simulate neural network analysis latency (1.8s)
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // Determine outcome: allow dev override or simulate realistic probability
  let outcome = options.forceOutcome;

  if (!outcome || outcome === 'random') {
    // If filename hints at AI or Real, respect it for intuitive testing, else pseudo-random
    const nameLower = imageFile.name.toLowerCase();
    if (nameLower.includes('ai') || nameLower.includes('midjourney') || nameLower.includes('dall') || nameLower.includes('synth')) {
      outcome = 'AI Generated';
    } else if (nameLower.includes('real') || nameLower.includes('photo') || nameLower.includes('human') || nameLower.includes('camera')) {
      outcome = 'Real';
    } else {
      // Semi-random deterministic based on file size
      outcome = (imageFile.size % 2 === 0) ? 'AI Generated' : 'Real';
    }
  }

  // Realistic confidence ranges (e.g. 88.5% - 97.8%)
  const baseConfidence = outcome === 'AI Generated' ? 94.7 : 91.3;
  const variation = (imageFile.size % 50) / 10; // 0.0 - 4.9
  const calculatedConfidence = Math.min(99.4, Math.max(82.0, baseConfidence + (variation - 2.5)));
  const roundedConfidence = Math.round(calculatedConfidence * 10) / 10;

  return {
    prediction: outcome,
    confidence: roundedConfidence,
    analyzedAt: new Date().toISOString(),
    isMock: true,
  };
}
