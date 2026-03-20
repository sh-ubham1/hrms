from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ModelViewSet):

    queryset = Employee.objects.only(
        "id",
        "employee_id",
        "full_name",
        "email",
        "department"
    ).order_by("-created_at")

    serializer_class = EmployeeSerializer

    http_method_names = ["get","post","delete"]