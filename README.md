# CarCar

Team:

* Lotus - Sales microservice and Vehicles React code (Inventory Microservice)
* Helen - Service microservice and Manufacturer/Automobile React (Inventory Microservice)

## Design

## Service microservice

AutomobileVO created to poll data from Inventory Automobile model in order to pull VIN numbers to determine VIP.

Appointment model created to list, create, modify, and delete service appointments.

Technician model created in order to create a technician to assign to the service appointments.

## Sales microservice

Models Created:
- InventoryVO: accesses the list of cars in inventory.
- SalesPerson: a sales person on staff.
- Customer: customer to purchase a vehicle.
- SalesRecord: record of sale of a vehicle; includes ForeignKeys to
InventoryVO, SalesPerson, and Customer models.
