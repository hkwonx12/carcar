from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile, SalesVO


# admin.site.register(Automobile)
# admin.site.register(Manufacturer)
# admin.site.register(VehicleModel)
# admin.site.register(SalesVO)


@admin.register(Automobile)
class AutomobileAdmin(admin.ModelAdmin):
    list_display = (
        "color",
        "year",
        "vin",
        "model",
    )

@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    list_display = (
        "name",
    )


@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "manufacturer"
    )


@admin.register(SalesVO)
class SalesVOAdmin(admin.ModelAdmin):
    list_display = (
        "vin",
    )
