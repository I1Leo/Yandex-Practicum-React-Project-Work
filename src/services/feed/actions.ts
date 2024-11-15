import { createAction } from '@reduxjs/toolkit';

export const wsFeedConnect = createAction<string, 'feed/connect'>(
	'feed/connect'
);
export const wsFeedDisconnect = createAction('feed/disconnect');
