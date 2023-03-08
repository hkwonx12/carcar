from django.urls import path
from .views import api_technicians, api_technician, api_list_appointments, api_detail_appointment

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_technician, name="api_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_detail_appointment, name="api_detail_appointment"),
]
