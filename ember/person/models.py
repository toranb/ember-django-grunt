from django.db import models

class Person(models.Model):
    username = models.CharField(max_length=25)

    class Meta(object):
        verbose_name_plural = 'people'
