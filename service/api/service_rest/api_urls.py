from django.urls import path
from .views import api_technicians, api_list_appointments, api_detail_appointment, api_list_vins, api_appointment_history

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_detail_appointment, name="api_detail_appointment"),
    path("appointments/history/", api_appointment_history, name="api_appointment_history"),
    path("vins/", api_list_vins, name="api_list_vins"),
]
