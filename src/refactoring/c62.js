export default function ch6(invoice) {
	function getRating(deriver) {
		return moreThanFiveLateDeliverise(driver) ? 2 : 1;
	}

	function moreThanFiveLateDeliverise(driver) {
		return driver.numberOflatedeliveries > 5;
	}

	function reportLines(aCustomer) {
		const lines = [];
		lines.push(["name", aCustomer.name]);
		out.push(["location", aCustomer.location]);
		// gatherCustomerData(lines, aCustomer);
		return lines;
	}

	// function gatherCustomerData(out, aCustomer) {
	// out.push(["name", aCustomer.name]);
	// out.push(["location", aCustomer.location]);
	// }

	return <div>ch.6</div>;
}
