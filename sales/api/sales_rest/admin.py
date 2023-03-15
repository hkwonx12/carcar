from django.contrib import admin

# Register your models here.
from .models import SalesPerson, Customer, SalesRecord, InventoryVO

@admin.register(InventoryVO)
class InventoryVOAdmin(admin.ModelAdmin):
    list_display = (
        "vin",
    )

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "employee_num"
    )

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "address",
        "phone"
    )

@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    list_display = (
        "auto",
        "salesperson",
        "customer",
        "price"
    )
