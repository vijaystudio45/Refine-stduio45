# your_app_name/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  CategoryViewSet ,BlogListView

router = DefaultRouter(trailing_slash='')

router.register(r'category', CategoryViewSet)
router.register(r'blog', BlogListView)

urlpatterns = [
    path('', include(router.urls)),

]
