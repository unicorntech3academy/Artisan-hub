from rest_framework import serializers
from .models import Job, Bid
from accounts.serializers import UserSerializer

class BidSerializer(serializers.ModelSerializer):
    artisan_details = UserSerializer(source='artisan', read_only=True)

    class Meta:
        model = Bid
        fields = ('id', 'job', 'artisan', 'artisan_details', 'amount', 'proposal', 'created_at')
        read_only_fields = ('id', 'artisan', 'created_at')

class JobSerializer(serializers.ModelSerializer):
    owner_details = UserSerializer(source='owner', read_only=True)
    artisan_details = UserSerializer(source='artisan', read_only=True)
    bids = BidSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = (
            'id', 'owner', 'owner_details', 'title', 'description', 
            'category', 'lga', 'budget', 'status', 'artisan', 
            'artisan_details', 'created_at', 'updated_at', 'bids'
        )
        read_only_fields = ('id', 'owner', 'created_at', 'updated_at', 'bids')
