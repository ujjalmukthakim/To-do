from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TodoModel
from .serializers import TodoSerializer

# Create your views here.

class TodoViewSet(ModelViewSet):
    queryset=TodoModel.objects.all()
    serializer_class=TodoSerializer