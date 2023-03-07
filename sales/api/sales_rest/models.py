from django.db import models

# Keep track of our current vehicle inventory.
class InventoryVO(models.Model):
    # Because the id of the VO may not match the id of the model instance,
    # use the URL returned by the model instance as its identifier.
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin
