from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = "__all__"

    def validate_employee_id(self, value):

        if Employee.objects.filter(employee_id=value).exists():

            raise serializers.ValidationError(
                "Employee ID already exists"
            )

        return value

    def validate_email(self, value):

        if Employee.objects.filter(email=value).exists():

            raise serializers.ValidationError(
                "Email already exists"
            )

        return value