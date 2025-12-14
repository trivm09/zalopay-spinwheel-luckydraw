import "./Registration.css";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAPI } from "../mockData";

// Đặt true để dùng mock data, false để dùng API thật
const USE_MOCK = true;

const API_URL = process.env.REACT_APP_API_URL;
const API_AUTH = {
	username: process.env.REACT_APP_API_USERNAME,
	password: process.env.REACT_APP_API_PASSWORD,
};

const Registration = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let response;
			const registratorData = {
				name: name,
				phone_number: phoneNumber,
				email: email,
				gift_set: "1",
			};

			if (USE_MOCK) {
				response = { data: await mockAPI.createRegistrator(registratorData) };
			} else {
				response = await Axios.post(
					`${API_URL}/registrator/`,
					registratorData,
					{ auth: API_AUTH }
				);
			}

			console.log(response.data);
			setErrorMessage(false);
			navigate("/spin-wheel");
		} catch (error) {
			console.log(`Error: ${error}`);
			if (error.response) {
				console.log(error.response.data);
			}
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
