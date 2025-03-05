from flask import Flask, request, jsonify
import numpy as np
import cv2
from utils import predict_gesture, recognize_face
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)
# ✅ API to predict hand gesture
@app.route("/predict-gesture", methods=["POST"])
def predict_gesture_api():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    
    gesture = predict_gesture(img)
    return jsonify({"gesture": gesture})

# ✅ API to recognize face
@app.route("/recognize-face", methods=["POST"])
def recognize_face_api():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    face_identity = recognize_face(img)
    return jsonify({"face_identity": face_identity})

if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask, request, jsonify
# import numpy as np
# import cv2
# import mediapipe as mp
# from tensorflow.keras.models import load_model

# app = Flask(__name__)

# # Load gesture model
# model_gesture = load_model("hand_gesture_model.h5")

# # Load MediaPipe Hands module
# mp_hands = mp.solutions.hands
# hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.5)

# # Gesture labels
# gesture_labels = {0: "Fist", 1: "Palm", 2: "Thumb Up", 3: "Thumb Down", 4: "OK"}

# # Function to process hand image
# def preprocess_image(img):
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     result = hands.process(img_rgb)
#     if result.multi_hand_landmarks:
#         landmarks = [lm.x for lm in result.multi_hand_landmarks[0].landmark] + \
#                     [lm.y for lm in result.multi_hand_landmarks[0].landmark] + \
#                     [lm.z for lm in result.multi_hand_landmarks[0].landmark]
#         return np.array(landmarks).reshape(1, 63, 1)
#     return None

# # API to predict hand gesture
# @app.route("/predict-gesture", methods=["POST"])
# def predict_gesture():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400
#     file = request.files["file"]
#     img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
#     input_data = preprocess_image(img)
#     if input_data is not None:
#         prediction = model_gesture.predict(input_data)
#         predicted_label = np.argmax(prediction)
#         return jsonify({"gesture": gesture_labels.get(predicted_label, "Unknown")})
#     else:
#         return jsonify({"gesture": "No hand detected"})

# if __name__ == "__main__":
#     app.run(debug=True)
