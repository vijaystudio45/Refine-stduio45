from unicodedata import category
from rest_framework import serializers
from .models import  Category,Blog

class CategorySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_title(self, obj):
        return obj.category

        
        
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id','title' , 'category',  'created_at', 'status', 'content']
    def to_representation(rself, instance):
        data = super().to_representation(instance)
        data['category'] = {'id': instance.category.id}
        data['category_id'] = instance.category.id
        return data
    
    
