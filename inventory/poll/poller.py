import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "inventory_project.settings")
django.setup()

# Poll to keep track of which cars were sold from inventory.
from inventory_rest.models import SalesVO

def poll():
    while True:
        print('Inventory poller polling for data')
        try:
            # URL for sales records from Sales microservice
            url = "http://sales-api:8000/api/sales/"
            response = requests.get(url)
            content = json.loads(response.content)
            print("Sales Records: ", content)

            # Loop through the list of sales and store each one's
            # href and VIN.
            for auto in content["sales_records"]:
                print("Auto: ", auto)
                print("HREF: ", auto["import_href"])
                SalesVO.objects.update_or_create(
                    import_href = auto["import_href"],
                    defaults={"vin": auto["vin"]},
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
