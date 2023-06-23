import json
import math
import secrets
import time
from django.shortcuts import get_object_or_404
from rest_framework import status
from agora_token_builder import RtcTokenBuilder
from uuid import uuid4
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MemberSerializer

from .models import RoomMember
# Create your views here.
def uid():
    return math.floor(secrets.randbelow(10000))

def get_RTmtoken(request):
    APPID = 'fd93b6246bdf43a588d57c859b15d1d6'
    APPCERTIFICATE = "5a115da3593140b89897b1ba4ed811a5"
    USERACC  = " 007eJxTYOhsbc8t5L4WzxW26vjW2oQAAQl+/YI9K5wm9XaVRTJfSFFgSEuxNE4yMzIxS0pJMzFONLWwSDE1T7YwtUwyNE0xTDGTEW1OaQhkZHhaspSBkYEViBkZQHwVBqPkxBRLizQDXQPTVAtdQ8PUVN1EI8sk3TRDQ2MLQ2MDcwODJACCnyS8"
    UID = uid()
    channelName = str(request.GET.get('channel'))
    ROLE = 1
    PRIVILEGE = 3600 * 24
    currenttime = time.time()
    privilegeEx = currenttime + PRIVILEGE
    token = RtcTokenBuilder.buildTokenWithUid(
            APPID, APPCERTIFICATE, channelName, UID, ROLE, privilegeEx
        )
    
    return JsonResponse({'token':token, 'uid':UID}, safe=False)

class ItemsList(APIView):

    def get(self, request, format=None):
        uid = request.GET.get('uid')
        room_name = request.GET.get('room_name')
        items = RoomMember.objects.filter(
            uid = uid,
            room_name = room_name
        )
        serializer = MemberSerializer(items, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        name = request.GET.get('name')
        uid = request.GET.get('uid')
        room_name = request.GET.get('room_name')
        print(request.data)
        serializer = MemberSerializer(data ={
            'name': name,
            'uid': uid, 
            'room_name': room_name
                                      })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, format=None, *args, **kwargs,):
        name = request.GET.get('name')
        uid = request.GET.get('uid')
        room_name = request.GET.get('room_name')
        item = get_object_or_404(
            RoomMember.objects.filter(
            name = name,
            uid = uid,
            room_name = room_name
        ))
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
