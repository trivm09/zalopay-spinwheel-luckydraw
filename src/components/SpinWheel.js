import "./SpinWheel.css";
import { useState, useEffect, useCallback } from "react";
import spinMusic from "../assets/music/spin-music.mp3";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const SpinWheel = () => {
	const navigate = useNavigate();

	const [angle, setAngle] = useState(0);
	const [spinning, setSpinning] = useState(false);
	const [items, setItems] = useState([]);

	const getListGiftSet = async () => {
		try {
			const response = await Axios.get("https://vominhtri.vn/giftset/", {
				auth: {
					username: "trivo",
					password: "Admin@123a@",
				},
			});
			let giftSet = response.data;
			return giftSet;
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const getLastRegistratorId = async () => {
		try {
			const response = await Axios.get(
				`https://vominhtri.vn/registrator/get_latest/`,
				{
					auth: {
						username: "trivo",
						password: "Admin@123a@",
					},
				}
			);
			return response.data.latest_id;
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const updateRegistratorGiftSet = async (registratorId, giftSetName) => {
		try {
			await Axios.patch(
				`https://vominhtri.vn/registrator/${registratorId}/`,
				{ gift_set: giftSetName },
				{
					auth: {
						username: "trivo",
						password: "Admin@123a@",
					},
				}
			);
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

		// Fetch the list of gift sets from the API
		const giftSet = await getListGiftSet();
		setItems(giftSet);

		setSpinning(true);
		audio.play();
		setTimeout(async () => {
			// Chọn ngẫu nhiên một phần tử từ mảng weightedItems
			const selectedItem =
				weightedItems[Math.floor(Math.random() * weightedItems.length)];
			setAngle(selectedItem.angle);

			// Trừ 1 pcs sau mỗi lần quay trúng
			selectedItem.pcs -= 1;

			try {
				await Axios.patch(
					`https://vominhtri.vn/giftset/${selectedItem.id}/`,
					selectedItem,
					{
						auth: {
							username: "trivo",
							password: "Admin@123a@",
						},
					}
				);
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
			<div
				key={spinning} // Add this line
				className={`Wheel ${spinning ? "spinning" : ""}`}
				style={{ transform: `rotate(${angle}deg)` }}
			></div>
			<div className="spin-btn" onClick={spinWheel}></div>
			{spinning ? (
				""
			) : (
				<button className="BackBtn" onClick={handlerBackBtn}>
					Back
				</button>
			)}
		</div>
	);
};

export default SpinWheel;
