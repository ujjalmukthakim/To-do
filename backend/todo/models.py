from django.db import models

# Create your models here.

class TodoModel(models.Model):
    title=models.TextField()
    description=models.CharField(max_length=50)
    