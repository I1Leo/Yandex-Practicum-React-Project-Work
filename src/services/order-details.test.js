import {
	activateOrderDetailsModal,
	deactivateOrderDetailsModal,
	getOrder,
	initialState,
	orderDetailsSlice,
} from './order-details';

const testOrder = '59374';

describe('orderDetailsSlice reducers check', () => {
	it('correct initial state', () => {
		const state = orderDetailsSlice.reducer(undefined, { type: undefined });

		expect(state).toEqual(initialState);
	});

	it('activateOrderDetailsModal', () => {
		const action = { type: activateOrderDetailsModal.type };

		const state = orderDetailsSlice.reducer(initialState, action);

		expect(state).toEqual({ ...initialState, isOrderDetailsModalActive: true });
	});

	it('deactivateOrderDetailsModal', () => {
		const action = { type: deactivateOrderDetailsModal.type };

		const state = orderDetailsSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			isOrderDetailsModalActive: false,
		});
	});

	it('getOrder pending', () => {
		const action = { type: getOrder.pending.type };

		const state = orderDetailsSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orderRequest: true,
			orderFailed: false,
		});
	});

	it('getOrder  fullfiled', () => {
		const action = { type: getOrder.fulfilled.type, payload: testOrder };

		const state = orderDetailsSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orderRequest: false,
			order: testOrder,
		});
	});

	it('getOrder rejected', () => {
		const action = { type: getOrder.rejected.type };

		const state = orderDetailsSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orderRequest: false,
			orderFailed: true,
		});
	});
});
