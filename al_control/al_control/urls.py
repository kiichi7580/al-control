# al_control/urls.py

from django.contrib import admin
from django.urls import path
from beer import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.ageconformation,name='ageconformation'),
    path('home/', views.home, name='home'),
    path('get_alcohol/', views.get_alcohol, name='get_alcohol'),
    path('add_alcohol/', views.add_alcohol, name='add_alcohol'),
    path('add_alcohol_page/', views.add_alcohol_page, name='add_alcohol_page'),
    path('calendar/', views.calendar, name='calendar'),
    path('all_events/', views.all_events, name='all_events'),
    path('add_event/', views.add_event, name='add_event'),
    path('update_event/', views.update_event, name='update_event'),
    path('remove_event/', views.remove_event, name='remove_event'),
    path('events_for_tomorrow/', views.events_for_tomorrow, name='events_for_tomorrow'),
]