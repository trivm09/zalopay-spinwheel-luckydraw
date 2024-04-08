import "./Registration.css";
import { useState } from "react";

const Registration = () => {
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		setName("");
		setPhoneNumber("");
		setEmail("");
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
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					></input>
				</div>
				<div className="InputContainer">
					<input
						className="Input"
						placeholder="SỐ ĐIỆN THOẠI:"
						type="number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					></input>
				</div>
				<div className="InputContainer">
					<input
						className="Input"
						placeholder="EMAIL:"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
