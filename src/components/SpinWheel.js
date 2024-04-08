import "./SpinWheel.css";
import { useState } from "react";
import spinMusic from "../assets/music/spin-music.mp3";

const SpinWheel = () => {
	const [angle, setAngle] = useState(0);
	const [spinning, setSpinning] = useState(false);

	let items = [
		{ id: 1, name: "Pin + voucher 100k", pcs: 20, angle: 120 },
		{ id: 2, name: "Pin + voucher 200k", pcs: 40, angle: 300 },
		{ id: 3, name: "Túi đeo chéo + voucher giảm 5%", pcs: 10, angle: 180 },
		{ id: 4, name: "Voucher 500K + gấu bông", pcs: 8, angle: 0 },
		{ id: 5, name: "Voucher 1 triệu", pcs: 1, angle: 60 },
		{ id: 6, name: "gấu bông", pcs: 30, angle: 240 },
	];

	let weightedItems = items.flatMap((item) => Array(item.pcs).fill(item));

	// Create a new Audio object
	const audio = new Audio(spinMusic);

	const spinWheel = () => {
		// If the wheel is already spinning, return early
		if (spinning) return;

		setSpinning(true);
		audio.play();
		setTimeout(() => {
			// Chọn ngẫu nhiên một phần tử từ mảng weightedItems
			const selectedItem =
				weightedItems[Math.floor(Math.random() * weightedItems.length)];
			setAngle(selectedItem.angle);

			// Trừ 1 pcs sau mỗi lần quay trúng
			items = items.map((item) =>
				item.id === selectedItem.id
					? { ...item, pcs: item.pcs - 1 }
					: item
			);

			// Cập nhật weightedItems sau mỗi lần quay
			weightedItems = items.flatMap((item) => Array(item.pcs).fill(item));

			setSpinning(false);
		}, 6000);
	};

	return (
		<div className="background">
			<div
				key={spinning} // Add this line
				className={`Wheel ${spinning ? "spinning" : ""}`}
				style={{ transform: `rotate(${angle}deg)` }}
			></div>
			<div className="spin-btn" onClick={spinWheel}></div>
		</div>
	);
};

export default SpinWheel;
