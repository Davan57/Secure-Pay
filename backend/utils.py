import numpy as np
import cv2
import mediapipe as mp
from tensorflow.keras.models import load_model
import pickle

# Load MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.5)

# Load Gesture Model & Labels
model_gesture = load_model("hand_gesture_model.h5")
with open("gesture_labels.pkl", "rb") as f:
    gesture_labels = pickle.load(f)

# Load Face Model & Labels
model_face = load_model("face_recognition_model.h5")
with open("face_labels.pkl", "rb") as f:
    face_labels = pickle.load(f)

# ✅ Preprocess Hand Gesture Image
def preprocess_gesture_image(img):
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(img_rgb)
    if result.multi_hand_landmarks:
        landmarks = [lm.x for lm in result.multi_hand_landmarks[0].landmark] + \
                    [lm.y for lm in result.multi_hand_landmarks[0].landmark] + \
                    [lm.z for lm in result.multi_hand_landmarks[0].landmark]
        return np.array(landmarks).reshape(1, 63, 1)
    return None

# ✅ Predict Gesture
def predict_gesture(img):
    input_data = preprocess_gesture_image(img)
    if input_data is not None:
        prediction = model_gesture.predict(input_data)
        predicted_label = np.argmax(prediction)
        return gesture_labels.get(predicted_label, "Unknown Gesture")
    else:
        return "No hand detected"

# ✅ Preprocess Face Image
def preprocess_face_image(img):
    img = cv2.resize(img, (100, 100))  # Resize to model's input shape
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype("float32") / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# # ✅ Recognize Face
# def recognize_face(img):
#     processed_img = preprocess_face_image(img)
#     prediction = model_face.predict(processed_img)
#     predicted_label = np.argmax(prediction)
    
#     if predicted_label >= len(face_labels):
#         return "Unknown Person"
    
#     return face_labels.get(predicted_label, "Unknown Person")

def recognize_face(img):
    processed_img = preprocess_face_image(img)
    prediction = model_face.predict(processed_img)
    predicted_label = np.argmax(prediction)

    # Convert face_labels keys to a list for indexing
    label_list = list(face_labels.keys())

    print(f"Predicted Label: {predicted_label}")
    print(f"Face Labels Dictionary: {face_labels}")
    print(f"Label List: {label_list}")

    if predicted_label < len(label_list):
        recognized_name = face_labels[label_list[predicted_label]]  # Get the corresponding name
        print(f"Recognized Name: {recognized_name}")
        return recognized_name
    else:
        print(f"Warning: Model predicted label {predicted_label}, but face_labels has only {len(label_list)} labels.")
        return "Unknown Person"


