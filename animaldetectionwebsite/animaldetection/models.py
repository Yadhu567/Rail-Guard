# animaldetection/models.py
from django.db import models

class AnimalDetection(models.Model):
    area_name = models.CharField(max_length=100)
    animal_name = models.CharField(max_length=100)
    confidence = models.FloatField()
    time = models.DateTimeField(auto_now_add=True)
    animal_image = models.CharField(max_length=100)
    sound_file =  models.CharField(max_length=100)
    no_detection = models.CharField(max_length=100)
    


