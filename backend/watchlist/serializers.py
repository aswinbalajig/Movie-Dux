from rest_framework import serializers
from . import models
class watchListSerializer(serializers.ModelSerializer):
    class Meta:
        fields=['movie']
        model=models.WatchList