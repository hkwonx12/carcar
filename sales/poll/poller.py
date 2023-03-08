import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Poll to keep track of our current vehicle inventory.
from sales_rest.models import InventoryVO

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # URL for data from Inventory microservice
            url = "http://inventory-api:8000/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)

            # Loop through the list of autos and store each one's
            # href and VIN.
            for auto in content["autos"]:
                InventoryVO.objects.update_or_create(
                    import_href = auto["href"],
                    defaults={"vin": auto["vin"]},
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
