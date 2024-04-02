import RegisterEmployeeForm from "@/app/components/registerEmployeeForm";

export default function RegisterEmployeePage() {
	return (
		<div className='max-w-md mx-auto my-10'>
			<h2 className='text-2xl font-semibold text-center'>
				Rejestracja Pracownika
			</h2>
			<RegisterEmployeeForm />
		</div>
	);
}
