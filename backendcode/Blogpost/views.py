from django.shortcuts import render
from rest_framework import viewsets,filters
from rest_framework import status, serializers
from .models import Category,Blog
from .serializers import CategorySerializer,BlogSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend




class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    pagination_class = None
    filter_backends = [filters.OrderingFilter,filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = ['category','id']
    search_fields = ['category']




    def get_queryset(self):
        if self.request.GET.get('_end'):
             return Category.objects.all().order_by('-created_at')[int(self.request.GET.get('_start')):int(self.request.GET.get('_end'))]
        return Category.objects.all().order_by('-created_at')
   


class BlogListView(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    pagination_class = None
    filter_backends = [filters.OrderingFilter,filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = ['category','id','title','status']
    search_fields = ['category__category','title','status']



    def get_queryset(self):
        if self.request.GET.get('_end'):
             return Blog.objects.all().order_by('-created_at')[int(self.request.GET.get('_start')):int(self.request.GET.get('_end'))]
        return Blog.objects.all().order_by('-created_at')
    
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        data = request.data.copy()
        
        data['category'] = request.data['category_id']
        serializer = self.get_serializer(
            instance, data=data, partial=partial)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        
             
   