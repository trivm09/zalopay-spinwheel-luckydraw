import "./SpinWheel.css";
import { useState, useEffect, useCallback } from "react";
import spinMusic from "../assets/music/spin-music.mp3";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { mockAPI } from "../mockData";

// Đặt true để dùng mock data, false để dùng API thật
const USE_MOCK = true;

const API_URL = process.env.REACT_APP_API_URL;
const API_AUTH = {
	username: process.env.REACT_APP_API_USERNAME,
	password: process.env.REACT_APP_API_PASSWORD,
};

const SpinWheel = () => {
	const navigate = useNavigate();

	const [angle, setAngle] = useState(0);
	const [spinning, setSpinning] = useState(false);
	const [items, setItems] = useState([]);
	const [errorMessage, setErrorMessage] = useState(false);

	const getListGiftSet = async () => {
		try {
			if (USE_MOCK) {
				return await mockAPI.getGiftSet();
			}
			const response = await Axios.get(`${API_URL}/giftset/`, {
				auth: API_AUTH,
			});
			return response.data;
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const getLastRegistratorId = async () => {
		try {
			if (USE_MOCK) {
				const result = await mockAPI.getLatestRegistrator();
				return result.latest_id;
			}
			const response = await Axios.get(
				`${API_URL}/registrator/get_latest/`,
				{ auth: API_AUTH }
			);
			return response.data.latest_id;
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const updateRegistratorGiftSet = async (registratorId, giftSetName) => {
		try {
			if (USE_MOCK) {
				await mockAPI.updateRegistrator(registratorId, { gift_set: giftSetName });
				return;
			}
			await Axios.patch(
				`${API_URL}/registrator/${registratorId}/`,
				{ gift_set: giftSetName },
				{ auth: API_AUTH }
			);
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const getRegistratorDataById = async (registratorId) => {
		try {
			if (USE_MOCK) {
				const registrator = await mockAPI.getRegistrator(registratorId);
				return registrator?.gift_set;
			}
			const response = await Axios.get(
				`${API_URL}/registrator/${registratorId}/`,
				{ auth: API_AUTH }
			);
			return response.data.gift_set;
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const updateItems = useCallback(async () => {
		const giftSet = await getListGiftSet();
		setItems(giftSet);
	}, []);

	useEffect(() => {
		updateItems();
	}, [updateItems]);

	let weightedItems = items.flatMap((item) => Array(item.pcs).fill(item));

	// Create a new Audio object
	const audio = new Audio(spinMusic);

	const spinWheel = async () => {
		// If the wheel is already spinning, return early
		if (spinning) return;

		const availableItems = weightedItems.filter((item) => item.pcs > 0);
		if (availableItems.length === 0) {
			return;
		}

		const lastRegistratorId = await getLastRegistratorId();
		const lastRegistratorData = await getRegistratorDataById(
			lastRegistratorId
		);

		if (lastRegistratorData !== "1") {
			return;
		}

		// Fetch the list of gift sets from the API
		const giftSet = await getListGiftSet();
		setItems(giftSet);

		setSpinning(true);
		audio.play();
		setTimeout(async () => {
			// Filter out items with zero quantity
			const availableItems = weightedItems.filter((item) => item.pcs > 0);
			// If there are no available items, stop here
			if (availableItems.length === 0) {
				setErrorMessage(true);
				setSpinning(false);
				return;
			}
			// Chọn ngẫu nhiên một phần tử từ mảng weightedItems
			const selectedItem =
				weightedItems[Math.floor(Math.random() * weightedItems.length)];
			setAngle(selectedItem.angle);

			// Trừ 1 pcs sau mỗi lần quay trúng
			selectedItem.pcs -= 1;

			try {
				if (USE_MOCK) {
					await mockAPI.updateGiftSet(selectedItem.id, selectedItem);
				} else {
					await Axios.patch(
						`${API_URL}/giftset/${selectedItem.id}/`,
						selectedItem,
						{ auth: API_AUTH }
					);
				}
				// Fetch the last registrator ID from the API
				const lastRegistratorId = await getLastRegistratorId();
				// console.log(`Last registrator ID: ${lastRegistratorId}`);

				// Update the giftset name for the last registrator
				await updateRegistratorGiftSet(
					lastRegistratorId,
					selectedItem.name
				);

				// Update items
				updateItems();
			} catch (error) {
				console.log(`Error: ${error}`);
			}

			// Cập nhật weightedItems sau mỗi lần quay
			weightedItems = items.flatMap((item) => Array(item.pcs).fill(item));

			setSpinning(false);
		}, 4000);
	};

	const handlerBackBtn = () => {
		navigate("/");
	};

	return (
		<div className="background">
			{errorMessage && (
				<div className="Alert">No more gifts available</div>
			)}
			<div
				key={spinning} // Add this line
				className={`Wheel ${spinning ? "spinning" : ""}`}
				style={{ transform: `rotate(${angle}deg)` }}
			></div>
			<div className="spin-btn" onClick={spinWheel}></div>
			{spinning ? (
				""
			) : (
				<div className="BackBtn" onClick={handlerBackBtn}></div>
			)}
		</div>
	);
};

export default SpinWheel;
