import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";
import { store } from "../store";
import { RootState } from "../../hooks";


export type TWsActionTypes<R> = {
   connect: ActionCreatorWithPayload<string>;
   disconnect: ActionCreatorWithoutPayload;
   onError: ActionCreatorWithPayload<string>;
   onMessage: ActionCreatorWithPayload<R>;
}

export const socketFeedMiddleware = <R>(wsActions: TWsActionTypes<R>): Middleware<NonNullable<unknown>, RootState> => {
   return store => {
       let socket: WebSocket | null = null;
       const {
           connect,
           disconnect,
           onError,
           onMessage
       } = wsActions;

       return next => action => {
           const {dispatch} = store;

           if (connect.match(action)) {
               socket = new WebSocket(action.payload);

               socket.onmessage = (e) => {
                   const {data} = e;

                   try {
                       const parsedData = JSON.parse(data);
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