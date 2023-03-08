from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

class VinListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "import_href",
        "vin",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "appointment",
        "reason",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment,
    properties = [
        "vin",
        "customer_name",
        "appointment",
        "reason",
        "vip",
        "finished",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
