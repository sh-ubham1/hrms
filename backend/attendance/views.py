from rest_framework import viewsets
from .models import Attendance
from .serializers import AttendanceSerializer

class AttendanceViewSet(viewsets.ModelViewSet):

    queryset = Attendance.objects.all()

    serializer_class = AttendanceSerializer

    def get_queryset(self):

        queryset = Attendance.objects.all()

        employee = self.request.query_params.get("employee")
        date = self.request.query_params.get("date")

        if employee:
            queryset = queryset.filter(employee=employee)

        if date:
            queryset = queryset.filter(date=date)

        return queryset