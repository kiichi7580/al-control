# al_control/urls.py

from django.contrib import admin
from django.urls import path
from beer import views  # beer アプリケーションの views モジュールをインポート

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),  # ホームページ
    path('calendar/', views.calendar, name='calendar'),  # カレンダーページ
    path('all_events/', views.all_events, name='all_events'),
    path('add_event/', views.add_event, name='add_event'),
    path('update/', views.update, name='update'),
    path('remove/', views.remove, name='remove'),
]
