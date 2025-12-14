// Mock data cho demo - không cần backend thật

export const mockGiftSet = [
	{ id: 1, name: "iPhone 15", pcs: 1, angle: 0 },
	{ id: 2, name: "AirPods Pro", pcs: 3, angle: 45 },
	{ id: 3, name: "Voucher 500K", pcs: 10, angle: 90 },
	{ id: 4, name: "Voucher 200K", pcs: 20, angle: 135 },
	{ id: 5, name: "Voucher 100K", pcs: 30, angle: 180 },
	{ id: 6, name: "Voucher 50K", pcs: 50, angle: 225 },
	{ id: 7, name: "Móc khóa", pcs: 100, angle: 270 },
	{ id: 8, name: "Chúc bạn may mắn", pcs: 200, angle: 315 },
];

export const mockRegistrators = [];

let registratorIdCounter = 1;

// Mock API functions
export const mockAPI = {
	// GET /giftset/
	getGiftSet: () => {
		return Promise.resolve([...mockGiftSet]);
	},

	// PATCH /giftset/:id/
	updateGiftSet: (id, data) => {
		const index = mockGiftSet.findIndex((item) => item.id === id);
		if (index !== -1) {
			mockGiftSet[index] = { ...mockGiftSet[index], ...data };
		}
		return Promise.resolve(mockGiftSet[index]);
	},

	// POST /registrator/
	createRegistrator: (data) => {
		// Check duplicate phone
		const exists = mockRegistrators.find(
			(r) => r.phone_number === data.phone_number
		);
		if (exists) {
			return Promise.reject({
				response: {
					data: { phone_number: ["Registrator with this phone number already exists."] },
				},
			});
		}

		const newRegistrator = {
			id: registratorIdCounter++,
			...data,
			created_at: new Date().toISOString(),
		};
		mockRegistrators.push(newRegistrator);
		return Promise.resolve(newRegistrator);
	},

	// GET /registrator/get_latest/
	getLatestRegistrator: () => {
		if (mockRegistrators.length === 0) {
			return Promise.resolve({ latest_id: null });
		}
		return Promise.resolve({
			latest_id: mockRegistrators[mockRegistrators.length - 1].id,
		});
	},

	// GET /registrator/:id/
	getRegistrator: (id) => {
		const registrator = mockRegistrators.find((r) => r.id === id);
		return Promise.resolve(registrator);
	},

	// PATCH /registrator/:id/
	updateRegistrator: (id, data) => {
		const index = mockRegistrators.findIndex((r) => r.id === id);
		if (index !== -1) {
			mockRegistrators[index] = { ...mockRegistrators[index], ...data };
		}
		return Promise.resolve(mockRegistrators[index]);
	},
};
