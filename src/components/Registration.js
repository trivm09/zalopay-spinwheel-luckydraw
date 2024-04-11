import "./Registration.css";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await Axios.post(
				"https://vominhtri.vn/registrator/",
				{
					name: name,
					phone_number: phoneNumber,
					email: email,
					gift_set: "1",
				},
				{
					auth: {
						username: "trivo",
						password: "Admin@123a@",
					},
				}
			);

			console.log(response.data); // Log the response data to the console
			setErrorMessage(false);
			// Redirect to the SpinWheel page
			navigate("/spin-wheel");
		} catch (error) {
			console.log(`Error: ${error}`);
			console.log(error.response.data);
			setErrorMessage(true);
		}

		setName("");
		setPhoneNumber("");
		setEmail("");
	};

	return (
		<div className="Background-Registration">
			<form className="FormControl" onSubmit={handleSubmit}>
				{errorMessage && (
					<div className="Alert">
						Registrator with this phone number already exists.
					</div>
				)}
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
						type="text"
						value={phoneNumber}
						pattern="\d{10}"
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
