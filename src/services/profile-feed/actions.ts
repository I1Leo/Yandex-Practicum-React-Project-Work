import { createAction } from '@reduxjs/toolkit';

export const wsProfileFeedConnect = createAction<string, 'profileFeed/connect'>(
	'profileFeed/connect'
);
export const wsProfileFeedDisconnect = createAction('profileFeed/disconnect');
