from ember.person.views import Person, People
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import patterns, url, include

urlpatterns = patterns('',
    url(r'^/(?P<pk>\d+)/$', csrf_exempt(Person.as_view())),
    url(r'^/$', csrf_exempt(People.as_view())),
)
