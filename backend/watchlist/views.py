from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login,logout,authenticate
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from . import serializers
from . import models
# Create your views here.

@method_decorator(csrf_exempt, name='dispatch')
class addRemoveWatchList(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,id):
        movie,created=models.WatchList.objects.get_or_create(user=request.user,movie=id)
        if created:
            return Response({'added successfully'},status=status.HTTP_200_OK)
        else:
            return Response({'watchlist entry already exists'},status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,id):
        delete_count,_=models.WatchList.objects.get(movie=id).delete()
        if delete_count>0:
            return Response({'Removed successfully'},status=status.HTTP_200_OK)
    def get(self,request):
        watchlists=models.WatchList.objects.filter(user=request.user)
        serializer=serializers.watchListSerializer(watchlists,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
