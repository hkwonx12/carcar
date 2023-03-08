from django.db import models
from django.urls import reverse

# Keep track of our current vehicle inventory.
class InventoryVO(models.Model):
    # Because the id of the VO may not match the id of the model instance,
    # use the URL returned by the model instance as its identifier.
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_num = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.employee_num})

class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})

class SalesRecord(models.Model):
    auto = models.ForeignKey(
        InventoryVO,
        related_name="inventory",
        on_delete=models.PROTECT,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesrecords",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="salesrecords",
        on_delete=models.PROTECT,
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def get_api_url(self):
        return reverse("api_salesrecord", kwargs={"pk": self.id})
