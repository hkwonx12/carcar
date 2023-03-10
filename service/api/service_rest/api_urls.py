from django.urls import path
from .views import api_technicians, api_list_appointments, api_detail_appointment, api_list_vins, api_appointment_history, api_rentals, api_rental

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_detail_appointment, name="api_detail_appointment"),
    path("appointments/history/", api_appointment_history, name="api_appointment_history"),
    path("vins/", api_list_vins, name="api_list_vins"),
    path("rentals/", api_rentals, name="api_rentals"),
    path("rentals/<int:id>/", api_rental, name="api_rental"),
]
