from django.urls import path
from .views import api_salesperson, api_customer, api_salesrecords

urlpatterns = [
    path("sales/", api_salesrecords, name="api_salesrecords"),
    path("sales/staff/", api_salesperson, name="api_salesperson"),
    path("sales/customers/", api_customer, name="api_customer"),
]
