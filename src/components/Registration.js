import "./Registration.css";

const Registration = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="Background-Registration">
			<form className="FormControl" onSubmit={handleSubmit}>
				<div className="InputContainer">
					<input
						className="Input"
						placeholder="HỌ & TÊN:"
						type="text"
						required
					></input>
				</div>
				<div className="InputContainer">
					<input
						className="Input"
						placeholder="SỐ ĐIỆN THOẠI:"
						type="number"
						required
					></input>
				</div>
				<div className="InputContainer">
					<input
						className="Input"
						placeholder="EMAIL:"
						type="email"
						required
					></input>
				</div>
				<button type="submit" className="SubmitButton">
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default Registration;
