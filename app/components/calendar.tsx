// components/Calendar.tsx
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import locale from "date-fns/locale/pl";

const locales = { pl: locale };

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
	getDay,
	locales,
});

const MyCalendar: React.FC = () => {
	const [events, setEvents] = useState<Event[]>([
		// Przykładowe wydarzenia
		{
			title: "Przykładowe zdarzenie",
			start: new Date(),
			end: new Date(),
			allDay: true,
		},
	]);

	return (
		<><div>Hello, user name</div>
			<div>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor='start'
					endAccessor='end'
					style={{ height: 500 }}
				/>
			</div>
		</>
	);
};

export default MyCalendar;
