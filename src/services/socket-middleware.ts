import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../hooks";
import { refreshToken } from "../utils/request";


export type TWsActionTypes<R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
}

export const socketMiddleware = <R>(wsActions: TWsActionTypes<R>, withTokenRefresh: boolean = false): Middleware<NonNullable<unknown>, RootState> => {
    return store => {
        let socket: WebSocket | null = null;
        const {
            connect,
            disconnect,
            onError,
            onMessage
        } = wsActions;

        return next => action => {
            const { dispatch } = store;
            let url = "";

            if (connect.match(action)) {
                socket = new WebSocket(action.payload);

                socket.onmessage = (e) => {
                    const { data } = e;

                    try {
                        const parsedData = JSON.parse(data);

                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                            refreshToken()
                                .then(refreshData => {
                                    const wssUrl = new URL(url);
                                    wssUrl.searchParams.set(
                                        "token",
                                        refreshData.accessToken.replace("Bearer ", "")
                                    );
                                    dispatch(connect(wssUrl.toString()));
                                })
                                .catch(err => {
                                    dispatch(onError((err as Error).message))
                                })

                            dispatch(disconnect());

                            return;
                        }

                        dispatch(onMessage(parsedData));
                    } catch (err) {
                        dispatch(onError((err as Error).message));
                    }
                }

                if (socket && disconnect.match(action)) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        }
    }
}