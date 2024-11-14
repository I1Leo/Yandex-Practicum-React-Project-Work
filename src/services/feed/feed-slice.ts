import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TFeedOrder, TFeedResponse } from '../../components/types/feed';

type TInitialState = {
	feed: TFeedResponse | null;
	connectionError: string | null;
	currentOrder: TFeedOrder | null;
};

export const initialState: TInitialState = {
	feed: null,
	connectionError: null,
	currentOrder: null,
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		wsFeedError: (state, action: PayloadAction<string>) => {
			state.connectionError = action.payload;
		},
		wsFeedMessage: (state, action: PayloadAction<TFeedResponse>) => {
			state.feed = action.payload;
		},
		setCurrentFeedOrder: (state, action: PayloadAction<TFeedOrder>) => {
			state.currentOrder = action.payload;
		},
	},
	selectors: {
		getFeed: (state) => state.feed,
	},
});

export const { wsFeedError, wsFeedMessage, setCurrentFeedOrder } =
	feedSlice.actions;
export const { getFeed } = feedSlice.selectors;
