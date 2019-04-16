# -*- coding: utf-8 -*-
"""
Created on Wed Jan  9 11:59:32 2019

@author: Krutika Lodaya
"""
import speech_recognition as sr
from flask import Flask, render_template, request, Response
from flask_cors import CORS, cross_origin
from FAQ_BOT_test import test_model



APP = Flask(__name__)
CORS(APP)

@APP.route('/', methods=['GET'])
def my_form():
    """
    Opens the page for chatbot
    """
    return render_template('AIchatbot_ver_5.5.html')

@APP.route('/faqbot', methods=['POST'])
@cross_origin()
def objectname():
    """
    Get data from the user.
    preprocessing on the data recieved.
    Collect the pickle made from the trained model and pass to testing module.
    Get response from the testing module and return reponse to user.
    """
    #try:
    text = request.form['input']
    print(text)
    #req = requests.get("https://AIchatbot.html")
    #text = text["text"]
    text_input = text.lower()
        # out_text = bot_predict.processing_data(text_input)
    obj = test_model("Latin.pickle")
    out_text = obj.predict_class(text_input)
        #print(out_text[0][0])
        #print(out_text[2][0])
        #print(out_text[0][0])
        #objectid = json.dumps(
           #{"question": out_text[0][0]})
        #para = styling(out_text[0][0])
    return Response(out_text[0][0], status=200, mimetype="text/html")
    #except:
     #   text =None
     #   return Response("Error",status = 200, mimetype = "text/html")

if __name__ == '__main__':
    APP.run(host="10:30:29:29",port=5000, debug=False)
    #objectname()
