from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class WatchList(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    movie=models.PositiveBigIntegerField()

    class Meta:
        constraints=[
            models.UniqueConstraint(fields=['user','movie'],name='unique together constraint')#forming primary key with two candidate keys
        ]
    
    def __str__(self):
        return f'{self.user.username} id={self.movie}'