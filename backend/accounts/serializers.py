from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'fullName', 'phone', 'role', 'lga', 'bio', 'skills', 'is_verified', 'avatar')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'fullName', 'phone', 'role', 'lga', 'bio', 'skills')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            fullName=validated_data.get('fullName', ''),
            phone=validated_data.get('phone', ''),
            role=validated_data.get('role', 'OWNER'),
            lga=validated_data.get('lga', ''),
            bio=validated_data.get('bio', ''),
            skills=validated_data.get('skills', [])
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
