import math
import random
import secrets
import time
from django.shortcuts import render
from rest_framework import status, viewsets
from .models import Post
from .serializers import PostSerializer
from agora_token_builder import RtmTokenBuilder, AccessToken
from uuid import uuid4
from django.http import JsonResponse
# Create your views here.
def uid():
    return math.floor(secrets.randbelow(10000))


def get_RTmtoken(request):
    APPID = 'fd93b6246bdf43a588d57c859b15d1d6'
    APPCERTIFICATE = "5a115da3593140b89897b1ba4ed811a5"
    USERACC  = "Admin1"
    UID = uid()
    ROLE = 1
    PRIVILEGE = 3600 * 24
    currenttime = time.time()
    privilegeEx = currenttime + PRIVILEGE
    token = RtmTokenBuilder.buildToken(
            APPID, APPCERTIFICATE, USERACC, ROLE, privilegeEx
        )
    
    return JsonResponse({'token':token, 'uid':UID}, safe=False)

class AccountViewSet(viewsets.ModelViewSet):
    serializer_class =  PostSerializer
    queryset = Post.objects.all().order_by('-created')