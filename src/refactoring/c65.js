export default function ch6(invoice) {
	function inNewEngland(customer) {
		return xxNEWinnewEngland(customer.address.state);
	}

	function xxNEWinnewEngland(stateCode) {
		["ma", "ct", "me", "vt,"].includes(stateCode);
	}

	const newEnglanders = someCustomers.filter((c) =>
		inNewEngland(c.address.state)
	);

	return <div>ch.6</div>;
}
