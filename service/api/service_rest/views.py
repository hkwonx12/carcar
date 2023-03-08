import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import TechnicianEncoder, AppointmentListEncoder, AppointmentDetailEncoder, AutomobileVOEncoder
from .models import Technician, Appointment, AutomobileVO


@require_http_methods(["GET"])
def api_list_vins(request):
    if request.method == "GET":
        vin = AutomobileVO.objects.all()
        return JsonResponse(
            {"vin": vin},
            encoder=AutomobileVOEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, vin=False):
    if request.method == "GET":
        appointments = Appointment.objects.filter(finished=False)
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = content["technician"]
            technician = Technician.objects.get(id=technician)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid tech"},
                status = 404,
            )
        try:
            vin = content["vin"]
            vip = AutomobileVO.objects.get(vin=vin)
            if vip:
                content["vip"] = True
                appointment = Appointment.objects.create(**content)
        except AutomobileVO.DoesNotExist:
            appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_detail_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder = AppointmentDetailEncoder,
                safe = False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment does not exists"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({"delete": count > 0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=id).update(**content)
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": f"Invalid appointment id: {id}"},
                status=404
            )


@require_http_methods(["GET"])
def api_appointment_history(request):
    if request.method == "GET":
        appointments = Appointment.objects.filter(finished=True)
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
