from django.db import models
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job, Bid
from .serializers import JobSerializer, BidSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def bid(self, request, pk=None):
        job = self.get_object()
        if request.user.role != 'ARTISAN':
            return Response({'error': 'Only artisans can place bids.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = BidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(job=job, artisan=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BidViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Allow users to see bids on their own jobs or their own bids
        user = self.request.user
        return Bid.objects.filter(models.Q(job__owner=user) | models.Q(artisan=user))
