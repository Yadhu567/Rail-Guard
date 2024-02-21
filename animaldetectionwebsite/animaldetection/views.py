# animaldetection/views.py
from django.shortcuts import render,HttpResponseRedirect
from pymongo import MongoClient
from .models import AnimalDetection
from pyrebase import pyrebase


config={
  "apiKey": "AIzaSyDzq2dvyGCKA1A1_8Kl62q0AfeVkDGiEYM",
  "authDomain": "animaldetection-43a5c.firebaseapp.com",
  "projectId": "animaldetection-43a5c",
  "storageBucket": "animaldetection-43a5c.appspot.com",
  "messagingSenderId": "563487220348",
  "appId": "1:563487220348:web:d2acba2d5ed8a72a7f5ff9",
  "measurementId": "G-QK59KBR5HV",
  "databaseURL": ""
}
# Initialising database,auth and firebase for further use
firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()


def alldocuments(request):
    #connection to MongoDB
    client = MongoClient('mongodb://localhost:27017')
    db = client['animal_detection']
    collection = db['detections']


    documents = collection.find().sort('_id', -1)

    context = {
        'documents': documents,
    }
    return render(request, 'alldocuments.html', context)

def signIn(request):
    return render(request,"Login.html")

 
def postsignIn(request):
    email=request.POST.get('email')
    pasw=request.POST.get('pass')
    try:
       
        user=authe.sign_in_with_email_and_password(email,pasw)
    except:
        message="Invalid Credentials!!Please ChecK your Data"
        return render(request,"Login.html",{"message":message})
    session_id=user['idToken']
    request.session['uid']=str(session_id)
    return render(request,"Home.html",{"email":email})
 
def logout(request):
    try:
        del request.session['uid']
    except:
        pass
    return render(request,"Login.html")
 
def signUp(request):
    return render(request,"Registration.html")
 
def postsignUp(request):
     email = request.POST.get('email')
     passs = request.POST.get('pass')
     name = request.POST.get('name')
     try:
        
        user=authe.create_user_with_email_and_password(email,passs)
        uid = user['localId']
        idtoken = request.session['uid']
        print(uid)
     except:
        message="username already exists"
        return render(request, "Registration.html",{"message":message})
     return render(request,"Login.html")
def reset(request):
	return render(request, "Reset.html")

def postReset(request):
	email = request.POST.get('email')
	try:
		authe.send_password_reset_email(email)
		message = "A email to reset password is successfully sent"
		return render(request, "Reset.html", {"msg":message})
	except:
		message = "Something went wrong, Please check the email you provided is registered or not"
		return render(request, "Reset.html", {"msg":message})

def lastdocument(request):
    #connection to MongoDB
    client = MongoClient('mongodb://localhost:27017')
    db = client['animal_detection']
    collection = db['detections']


    document = collection.find().sort('_id', -1).limit(1)[0]

    
    context = {
        'document': document,
    }
    return render(request, 'lastdocument.html', context)
