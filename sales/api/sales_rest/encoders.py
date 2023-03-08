from common.json import ModelEncoder
from .models import InventoryVO, SalesPerson, Customer, SalesRecord

class InventoryVOEncoder(ModelEncoder):
    model = InventoryVO
    properties = [
        "import_href",
        "vin"
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_num",
        "id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone",
        "id",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "auto",
        "salesperson",
        "customer",
        "price",
        "id",
    ]
    encoders = {
        "auto": InventoryVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }
