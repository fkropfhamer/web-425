import numpy as np
from tensorflow import keras
import pathlib

trained_model = keras.models.load_model("app/models/model_mnist.h5")

def evaluate_mnist(matrix):
    global trained_model
   # trained_model = keras.models.load_model("model.h5")
    prediction = trained_model.predict(np.array([matrix]))
    predicted_label = np.argmax(prediction)
    prediction_probability = prediction[0][predicted_label]

    return predicted_label, prediction_probability