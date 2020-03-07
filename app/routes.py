from app import app
from flask import request, jsonify, render_template, abort
from app import classify

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mobile/')
def mobile_index():
    return render_template('index.amp.html')

@app.route('/mobile/mobile')
def mobile_mobile():
    return render_template('mobile.amp.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/question', methods=['POST', 'GET'])
def question():
    if request.method == 'GET':
        return render_template('question.html')
    try:
        data = request.get_json()
        question = data['question']
        length = len(question)
        
        if (length == 0):
            raise ValueError("question can´t be empty!")

        if (length % 2 == 0):
            return jsonify("Yes")

        return jsonify("No")
    except:
        abort(400)

@app.route('/mnist/server', methods=['POST', 'GET'])
def mnist_server():
    if request.method == 'GET':
        return render_template('mnist_server.html')

    try: 
        data = request.get_json()['data']

        classification = classify.classify_mnist(data)

        return jsonify(classification)

    except Exception as e:
        abort(400)
        