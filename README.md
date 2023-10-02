# CarCar

Team:

* Lotus - Sales microservice and Vehicles React code (Inventory Microservice)
* Helen - Service microservice and Manufacturer/Automobile React (Inventory Microservice)

## Design
React Front End
Django Framework Back End 

## Intended Market
We are targeting dealerships looking for an all-in-one application to manage their inventory, services, and sales. 


##Functionality
### Service microservice

AutomobileVO created to poll data from Inventory Automobile model in order to pull VIN numbers to determine VIP.

Appointment model created to list, create, modify, and delete service appointments.

Technician model created in order to create a technician to assign to the service appointments.

### Sales microservice

Models Created:
- InventoryVO: accesses the list of cars in inventory.
- SalesPerson: a sales person on staff.
- Customer: customer to purchase a vehicle.
- SalesRecord: record of sale of a vehicle; includes ForeignKeys to
InventoryVO, SalesPerson, and Customer models.

## Area of Improvement
Bootstrap can be added to enhance the design of the application. The navigation bar can also use a drop-down toggle to organize the links by their microservices. A login feature using jwt can be added to secure the data so that no one outside of the dealership can access the information. 

## Project Initialization
To fully enjoy this application on your local machine, please make sure to follow these steps:
1. Fork and clone the respository to your local machine
2. CD into the new project directory
3. Run docker compose build
4. Run docker compose up
5. Enter localhost:3000 in your browser and enjoy CarCar!
