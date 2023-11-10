from rest_framework import serializers
from .models import  Category,Blog

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
        
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id','title' , 'category',  'created_at', 'status', 'content']
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = {'id': instance.category.id}
        data['category_id'] = instance.category.id
        return data
    
    
class BlogDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id','title' , 'category',  'created_at', 'status', 'content']
