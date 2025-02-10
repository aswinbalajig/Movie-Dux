from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User=get_user_model()#returns user model that is active in this project


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email','username' ,'password', 'first_name', 'last_name')