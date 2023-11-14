from django.db import models

# Create your models here.
from django.db import models

# Base model with created_at and updated_at fields
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# Category model inheriting from BaseModel
class Category(BaseModel):
    category = models.CharField(max_length=255)
    def __str__(self):
        return self.category



# Blog model
class Blog(BaseModel):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='categories')
    status = models.CharField(max_length=50)
    content = models.TextField()


    def __str__(self):
        return self.title
