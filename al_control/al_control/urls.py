# al_control/urls.py

from django.contrib import admin
from django.urls import path
from beer import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.ageconformation,name='ageconformation'),
    path('home', views.home, name='home'),
    path('calendar/', views.calendar, name='calendar'),
    path('all_events/', views.all_events, name='all_events'),
    path('add_event/', views.add_event, name='add_event'),
    path('update/', views.update, name='update'),
    path('remove/', views.remove, name='remove'),
    path('events_for_tomorrow/', views.events_for_tomorrow, name='events_for_tomorrow'),
]