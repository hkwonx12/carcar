from django.db import models

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField()

    def __str__(self):
        return self.name

class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=100)
    appointment = models.DateTimeField(null=True)
    reason = models.CharField(max_length=200)
    vip = models.BooleanField(blank=True, default=False, null=True)
    finished = models.BooleanField(default=False, null=True, blank=True)
    rentals = models.BooleanField(default=False, null=True, blank=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.customer_name


class Rental(models.Model):
    mileage = models.PositiveIntegerField(null=True)
    rental_start = models.DateTimeField(null=True)
    rental_end = models.DateField(null=True)
    returned = models.BooleanField(blank=True, default=False, null=True)
    appointment = models.ForeignKey(
        Appointment,
        related_name="rental",
        on_delete=models.PROTECT,
        null=True,
    )

    def __str__(self):
        return self.mileage
