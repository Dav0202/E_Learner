from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register(r'feed', views.AccountViewSet)
urlpatterns = [
    path("chat_get_agora/", views.get_RTmtoken),
]
urlpatterns += router.urls
