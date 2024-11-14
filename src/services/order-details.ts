import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getOrder } from './api';

type TInitialState = {
	orderRequest: boolean;
	orderFailed: boolean;
	order: string | null;
	isOrderDetailsModalActive: boolean;
};

export const initialState: TInitialState = {
	orderRequest: false,
	orderFailed: false,
	order: null,
	isOrderDetailsModalActive: false,
};

export const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		activateOrderDetailsModal(state) {
			state.isOrderDetailsModalActive = true;
		},
		deactivateOrderDetailsModal(state) {
			state.isOrderDetailsModalActive = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrder.pending, (state) => {
				state.orderRequest = true;
				state.orderFailed = false;
			})
			.addCase(getOrder.fulfilled, (state, action: PayloadAction<string>) => {
				state.orderRequest = false;
				state.order = action.payload;
			})
			.addCase(getOrder.rejected, (state) => {
				state.orderRequest = false;
				state.orderFailed = true;
			});
	},
});


export const { activateOrderDetailsModal, deactivateOrderDetailsModal } = orderDetailsSlice.actions

export { getOrder }