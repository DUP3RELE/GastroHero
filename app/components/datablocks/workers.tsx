
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  position: string;
}

export default function Workers() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      const restaurantId = localStorage.getItem("restaurant_id");
      if (!token || !restaurantId) {
        console.error("Brak tokenu lub ID restauracji");
        setError("Brak tokenu lub ID restauracji");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/employees?restaurant_id=${restaurantId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const employees: Employee[] = await response.json();
          setEmployees(employees);
        } else {
          const errMsg = await response.text();
          throw new Error(`Nie udało się pobrać danych pracowników: ${errMsg}`);
        }
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="w-1/4 m-3 p-3 rounded border shadow-lg dark:shadow-blue-800 shadow-blue-300">
      <div className="m-3">
        <p>Pracownicy</p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="m-2">
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - {employee.position}
            </li>
          ))}
        </ul>
        <Link
          href="/pages/userpanel/employeeManagement"
          className="hover:underline-offset-4"
        >
          ...
        </Link>
      </div>
    </div>
  );
}
