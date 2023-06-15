from rest_framework.serializers import ModelSerializer 
from .models import RoomMember

class MemberSerializer(ModelSerializer):
    class Meta:
        model = RoomMember
        fields = '__all__'
        
    def get_name(self, obj):
        query = RoomMember.objects.filter(
            name=obj.name)
        serializer = MemberSerializer(query, many=True)

        return serializer.data
    
    def get_room_name(self, obj):
        query = RoomMember.objects.filter(
            room_name=obj.room_name)
        serializer = MemberSerializer(query, many=True)

        return serializer.data
