from django.urls import path
from .api_views import api_salesperson, api_salespersondetails, api_customer, api_salesrecords

urlpatterns = [
    path("sales/", api_salesrecords, name="api_salesrecords"),
    path("sales/staff/", api_salesperson, name="api_salesperson"),
    path("sales/staff/<int:id>/", api_salespersondetails, name="api_salespersondetails"),
    path("sales/customers/", api_customer, name="api_customer"),
]
