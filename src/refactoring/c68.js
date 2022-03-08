export default function ch6(invoice) {
	const station = {
		name: "shong",
		redings: [
			{ temp: 45, time: "2022.02.03" },
			{ temp: 35, time: "2022.02.03" },
			{ temp: 45, time: "2022.02.03" },
			{ temp: 42, time: "2022.02.03" },
			{ temp: 41, time: "2022.02.03" },
		],
	};

	class Rnage {
		constructor(min, max) {
			this._data = { min: min, max: max };
		}
		get min() {
			return this._data.min;
		}
		get max() {
			return this._data.max;
		}
	}

	function readingsOutsideRange(station, Rnage) {
		return station.redings.filter(
			(r) => r.temp < Range.min || r.temp > Rnage.Max
		);
	}

	const Range = new NumberRange(
		operationPlan.tempeFloor,
		operationPlan.tempCeiling
	);

	alerts = readingsOutsideRange(station, Range);

	return <div>ch.6</div>;
}
