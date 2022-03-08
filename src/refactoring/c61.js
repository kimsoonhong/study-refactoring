export default function ch6(invoice) {
	printBanner();
	//미해결 채무 계산
	const outstanding = calculateOutstanding();
	recordDueDate(invoice);
	printDetails(invoice, outstanding);

	function recordDueDate(invoice) {
		//마감일 기록
		const today = Clock.today;
		invoice.dueDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 30
		);
	}

	function printBanner() {
		console.log("고객채무");
	}

	function printDetails(invoice, outstanding) {
		console.log(`고객명 ${invoice.customer}`);
		console.log(`채무액 ${outstanding}`);
		console.log(`마감일 ${invoice.dueDate.toLocaleDateString()}`);
	}

	function calculateOutstanding(invoice) {
		let result = 0;
		for (const o of invoice.orders) {
			result += o.amount;
		}
		return result;
	}

	return <div>ch.6</div>;
}
