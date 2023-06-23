from django.urls import path

from . import views

urlpatterns = [
    path("get_agora/", views.get_RTmtoken),
    path("member/", views.ItemsList.as_view())
]