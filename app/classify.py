import numpy as np
from app.evaluate import evaluate_mnist

def classify_mnist(data):
    proccessd_data = process_mnist_data(data)
    reshaped_data = reshape_mnist_data(proccessd_data)
    label, probability = evaluate_mnist(reshaped_data)

    label = label.item()
    probability = probability.item()

    return {'label': label, 'probability': probability}

def process_mnist_data(data):
    n = 28
    proccessd_data = [data[i:i + n] for i in range(0, len(data), n)]

    normalize_function = np.vectorize(lambda x: 1 if x!=0 else 0)

    proccessd_data = np.array(proccessd_data)
    proccessd_data = normalize_function(proccessd_data)

    shape = proccessd_data.shape

    if (28, 28) != proccessd_data.shape:
        raise ValueError("wrong data shape")

    return proccessd_data

def reshape_mnist_data(data):
    reshaped_data = data.reshape(28, 28, 1)
    reshaped_data = reshaped_data.astype('float32')

    return reshaped_data
