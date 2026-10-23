export function formatIsoDate(isoString) {
	const date = new Date(isoString);

	// Configure the formatter to extract the required pieces
	const formatter = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		// timeZone: 'UTC' // Uncomment this line if you want to force UTC instead of local time
	});

	// Extract parts into an easy-to-use lookup object
	const parts = formatter.formatToParts(date);
	const p = {};
	parts.forEach(({ type, value }) => {
		p[type] = value;
	});

	// Assemble into your desired format: "12 Oct 2026 09:00 AM"
	return `${p.day} ${p.month} ${p.year} ${p.hour}:${p.minute} ${p.dayPeriod}`;
}
