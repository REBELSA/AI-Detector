import tensorflow as tf
import numpy as np

MODEL_PATH = 'ai_image_detector.keras'
model = tf.keras.models.load_model(MODEL_PATH)
IMG_SIZE = (160, 160)

temp_path = 'frontend/GT Final/sample_test_image.png'

# Using PIL (the one that fails in user's process)
try:
    img = tf.keras.utils.load_img(temp_path, target_size=IMG_SIZE)
    img_array_pil = tf.keras.utils.img_to_array(img)
    img_array_pil = tf.expand_dims(img_array_pil, 0)
    prob_pil = model.predict(img_array_pil, verbose=0)[0][0]
    print("PIL Prediction:", prob_pil)
except Exception as e:
    print("PIL failed:", e)

# Using tf.io
img_raw = tf.io.read_file(temp_path)
img_tensor = tf.io.decode_image(img_raw, channels=3, expand_animations=False)
img_tensor = tf.image.resize(img_tensor, IMG_SIZE)
img_array_tf = tf.expand_dims(img_tensor, 0)
prob_tf = model.predict(img_array_tf, verbose=0)[0][0]
print("TF IO Prediction:", prob_tf)

print("Difference:", abs(prob_pil - prob_tf))
