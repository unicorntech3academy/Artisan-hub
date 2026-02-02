from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, BidViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'bids', BidViewSet, basename='bid')

urlpatterns = [
    path('', include(router.urls)),
]
