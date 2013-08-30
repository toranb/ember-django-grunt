from django.views.generic import TemplateView
from ember.person import resources
from rest_framework import generics
from ember.person.models import Person


class HomeView(TemplateView):
    template_name = 'index.html'


class People(generics.ListCreateAPIView):
    model = Person
    serializer_class = resources.PersonSerializer


class Person(generics.RetrieveUpdateDestroyAPIView):
    model = Person
    serializer_class = resources.PersonSerializer
