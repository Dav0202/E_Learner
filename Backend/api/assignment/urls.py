"""Url for assignment View and Creation
"""
from rest_framework.routers import DefaultRouter
from api.views import AssignmentViewSet


router = DefaultRouter()
router.register(
    r'', AssignmentViewSet, basename='assignments'
)

urlpatterns = router.urls
