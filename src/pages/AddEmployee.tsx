import EmployeeForm from "../components/empoyee/employee-form";

export default function AddEmpolyeePage(){
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">New Employee</h1>

            <hr className="pb-4"/>
            <EmployeeForm employee={null}/>
        </div>
    )
}