from rest_framework.decorators import api_view
from rest_framework.response import Response
from employees.models import Employee
from attendance.models import Attendance
from datetime import date
from django.core.cache import cache

@api_view(["GET"])
def dashboard_summary(request):

    cached = cache.get("dashboard_data")

    if cached:
        return Response(cached)

    today = date.today()

    total_employees = Employee.objects.count()

    present_today = Attendance.objects.filter(
        date=today,
        status="Present"
    ).count()

    absent_today = Attendance.objects.filter(
        date=today,
        status="Absent"
    ).count()

    data = {
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today
    }

    cache.set("dashboard_data", data, 60)

    return Response(data)