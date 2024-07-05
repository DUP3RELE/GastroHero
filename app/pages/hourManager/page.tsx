import { useEmployeeName } from "@/app/api/hooks/useEmployeeName";


export default function hourManager() {
	return (
		<>
			<div>
				<p>Hello (name), your hour count in month (month) is: (hours)</p>
			</div>
			<div>
				<p>months, days</p>
				<p>calendar, where employee can input his hours! show acctual day, and show past days.</p>
			</div>
		</>
	);
}
