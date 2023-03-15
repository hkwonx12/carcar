from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import SalesPerson, Customer, SalesRecord, InventoryVO
from .encoders import SalesPersonEncoder, CustomerEncoder, SalesRecordEncoder

@require_http_methods(["POST", "GET"])
def api_salesperson(request):
    """
    POST: creates a new sales person
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
        salespeople = SalesPerson.objects.all().order_by('name')
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT"])
def api_salespersondetails(request, id):
    """
    GET: returns the salesperson's details
    PUT: updates the salesperson's details
    """
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(employee_num=id)
            return JsonResponse(
                {"salesperson": salesperson},
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "*******Invalid Employee ID"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        SalesPerson.objects.filter(employee_num=id).update(**content)
        salesperson = SalesPerson.objects.get(employee_num=id)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["POST", "GET"])
def api_customer(request):
    """
    POST: creates a new customer
    GET: returns the list of customers
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

        # Add InventoryVO object for the auto to the sales record
        auto = InventoryVO.objects.get(vin=new_sale["auto"])
        new_sale["auto"] = auto

        # Add appropriate SalesPerson object to the sales record
        staff = SalesPerson.objects.get(id=new_sale["salesperson"])
        new_sale["salesperson"] = staff

        # Add appropriate Customer object to the sales record
        customer = Customer.objects.get(id=new_sale["customer"])
        new_sale["customer"] = customer

        try:
            sale = SalesRecord.objects.create(**new_sale)
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except InventoryVO.DoesNotExist:
            return JsonResponse(
                {"message": "*******Automobile with this VIN not in inventory"},
                status=404,
            )
    else:
        # Get and return the list of sales records
        records = SalesRecord.objects.all().order_by('salesperson__name')
        return JsonResponse(
            {"sales_records": records},
            encoder=SalesRecordEncoder,
            safe=False,
        )
