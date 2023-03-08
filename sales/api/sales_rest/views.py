from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import SalesPerson, Customer, SalesRecord, InventoryVO
from .encoders import SalesPersonEncoder, CustomerEncoder, SalesRecordEncoder

@require_http_methods(["POST", "GET"])
def api_salesperson(request):
    """
    POST: creates a new instance of the SalesPerson model
    GET: returns the list of sales people
    """
    if request.method == "POST":
        new_salesperson = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**new_salesperson)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    else:
        # Get and return the list of sales people
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalesPersonEncoder,
            safe=False,
        )

@require_http_methods(["POST", "GET"])
def api_customer(request):
    """
    POST: creates a new instance of the Customer model
    GET: returns the list of sales customers
    """
    if request.method == "POST":
        new_customer = json.loads(request.body)
        customer = Customer.objects.create(**new_customer)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        # Get and return the list of sales people
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["POST", "GET"])
def api_salesrecords(request):
    """
    POST: creates a new sales record
    GET: returns the list of all sales records
    """
    if request.method == "POST":
        new_sale = json.loads(request.body)
        print(f"Sale Data Received: {new_sale}")

        # Add InventoryVO object for the auto to the sales record
        auto = InventoryVO.objects.get(vin=new_sale["auto"])
        new_sale["auto"] = auto

        # Add appropriate SalesPerson object to the sales record
        staff = SalesPerson.objects.get(id=new_sale["salesperson"])
        new_sale["salesperson"] = staff

        # Add appropriate Customer object to the sales record
        customer = Customer.objects.get(id=new_sale["customer"])
        new_sale["customer"] = customer

        print("Sales Record Created: ", new_sale)
        try:
            sale = SalesRecord.objects.create(**new_sale)
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except InventoryVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile with this VIN not in inventory"},
                status=404,
            )
    else:
        # Get and return the list of sales records
        records = SalesRecord.objects.all()
        print("Sales Records: ", records)
        return JsonResponse(
            {"sales_records": records},
            encoder=SalesRecordEncoder,
            safe=False,
        )
