from django.urls import path
from . import views
urlpatterns=[
    path('<int:id>/',views.addRemoveWatchList.as_view(),name='watchlist'),
    path('',views.addRemoveWatchList.as_view(),name="getwatchlist")
]