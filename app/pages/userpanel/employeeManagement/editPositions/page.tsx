import PositionSelect from "@/app/components/positionSelect";

export default function editEmployee() {
	return (
		<>
			<div>
				<h1>Edytuj Pozycje</h1>
			</div>
			<div>
				<PositionSelect />
				<button>Nowa pozycja</button>
			</div>
		</>
	);
}
