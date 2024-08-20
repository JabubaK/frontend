import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  id: number;
};

type EmployeeFormProps = {
  employee: FormValues | null; // Recibe el empleado o null
};

export default function EmployeeForm({ employee }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      console.log("Employee data:", employee); // Verifica si los datos están llegando correctamente
      setValue("firstName", employee.firstName);
      setValue("lastName", employee.lastName);
      setValue("age", employee.age);
      setValue("sex", employee.sex);
    }
  }, [employee, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (employee) {
        // Modo edición
        await axios.put(
          `http://localhost:5003/api/Employee/${employee.id}`,
          null,
          {
            params: data,
          }
        );
        toast.success("Employee updated.");
      } else {
        // Modo creación
        await axios.post("http://localhost:5003/api/Employee", null, {
          params: data,
        });
        toast.success("Employee added.");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
          <input
          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <span className="text-red-400 text-sm font-semibold">{errors.firstName.message}</span>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
          <input
          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <span className="text-red-400 text-sm font-semibold">{errors.lastName.message}</span>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Age</label>
          <input
          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            {...register("age", { required: true, min: 18, max: 100 })}
          />
          {errors.age && <span className="text-red-400 text-sm font-semibold">Age must be a number between 18 and 100</span>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Sex</label>
          <select
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          {...register("sex", { required: true })}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          {errors.sex && <span>Sex is required</span>}
        </div>
      </div>

    
      <button type="submit" className="flex items-center bg-black text-white rounded-md px-4 py-2">
        {employee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
}
