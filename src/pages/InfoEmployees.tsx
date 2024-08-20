import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm, { FormValues } from "../components/empoyee/employee-form";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../modals/confirm-delete-modal";

export default function EmployeeInfoPage() {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/Employee/${id}`
        );
        setEmployee(response.data.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5003/api/Employee/${id}`);
      toast.success("Employee deleted.");
      navigate("/");
    } catch (error) {
      toast.error("something went wrong.");
      console.error("Error deleting employee:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold">Info Employee</h1>
        <button
          className="bg-red-500 text-white fill-white p-3 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>

      <hr className="pb-4" />

      <EmployeeForm employee={employee} />

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
