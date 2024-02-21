from django.urls import path
from . import views

app_name = 'animaldetection'

urlpatterns = [
    path('', views.signIn, name='signIn'),
    path('last/', views.lastdocument, name='lastdocument'),
    path('all/', views.alldocuments, name='alldocuments'),
    path('postsignIn/', views.postsignIn),
    path('signUp/', views.signUp, name="signUp"),
    path('logout/', views.logout, name="logout"),
    path('postsignUp/', views.postsignUp),
    path('reset/', views.reset),
    path('postReset/', views.postReset),
]
