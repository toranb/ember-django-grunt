from rest_framework import serializers
from ember.person.models import Person

class PersonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Person
        fields = ('id', 'username')
