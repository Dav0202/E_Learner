"""
    User API views
"""
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
# Create your views here.
from rest_framework import viewsets

from .models import User, Educator, Student
from .serializers import EducatorSerializer, StudentSerializer, CookieTokenRefreshSerializer, MyTokenObtainPairSerializer
# Create your views here.

class StudentViewSet(viewsets.ModelViewSet):
    """
        Student Profile API View
    """
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    
class EducatorViewSet(viewsets.ModelViewSet):
    """
        Educator Profile API View
    """
    serializer_class = EducatorSerializer
    queryset = Educator.objects.all()
    
class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        """
            return new refresh token view
        """
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14
            response.set_cookie('refresh_token', response.data['refresh'], max_age=cookie_max_age, httponly=True )
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def finalize_response(self, request, response, *args, **kwargs):
        """
            return new token view 
        """
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14
            response.set_cookie('refresh_token', response.data['refresh'], max_age=cookie_max_age, httponly=True )
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)