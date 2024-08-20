import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../data-table";
import { Link } from "react-router-dom";
import { Eye, Plus } from "lucide-react";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
};

export default function EmployeeClient() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5003/api/Employee");
        setEmployees(response.data.data);
      } catch {
        setError("Error fetching employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columns = [
    { header: "First Name", accessor: "firstName" as keyof Employee },
    { header: "Last Name", accessor: "lastName" as keyof Employee },
    { header: "Age", accessor: "age" as keyof Employee },
    { header: "Sex", accessor: "sex" as keyof Employee },
    {
      header: "Actions",
      accessor: 'actions',
      render: (employee: Employee) => (
        <Link to={`/employees/${employee.id}`}>
          <button className="border border-solid border-black border-opacity-20 hover:bg-slate-100 p-2 rounded"><Eye className="h-4 w-4"/></button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center w-full justify-between pb-6">
        <h1 className="text-3xl font-bold">Employees({employees.length})</h1>
        <Link
          className="flex items-center bg-black text-white rounded-md p-3 md:p-2"
          to={"/employees/add"}
        >
          <Plus className="h-4 w-4 md:mx-2" />
          <span className="hidden md:inline mr-2">Add Employee</span>
        </Link>
      </div>
      <hr className="w-full" />
      <DataTable columns={columns} data={employees} />
    </>
  );
}
