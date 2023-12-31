from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
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
        "vip",
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
