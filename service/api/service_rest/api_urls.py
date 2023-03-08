from django.urls import path
from .views import api_technicians, api_list_appointments, api_detail_appointment, api_list_vins

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_detail_appointment, name="api_detail_appointment"),
    path("vins/", api_list_vins, name="api_list_vins"),
]
