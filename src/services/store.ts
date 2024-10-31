import { Middleware, combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./burger-ingredients";
import { constructorIngredientsSlice } from "./burger-constructor";
import { ingredientDetailsSlice } from "./ingredient-details";
import { orderDetailsSlice } from "./order-details";
import { authSlice } from "./auth";
import { feedSlice, wsFeedError, wsFeedMessage, } from "./feed/feed-slice";
import { wsFeedConnect, wsFeedDisconnect } from "./feed/actions";
import { profileFeedSlice, wsProfileFeedError, wsProfileFeedMessage } from "./profile-feed/profile-feed-slice";
import { wsProfileFeedConnect, wsProfileFeedDisconnect } from "./profile-feed/actions";
import { socketMiddleware } from "./socket-middleware";

const rootReducer = combineSlices(
   ingredientsSlice,
   constructorIngredientsSlice,
   ingredientDetailsSlice,
   orderDetailsSlice,
   authSlice,
   feedSlice,
   profileFeedSlice,
);

const feedMiddleware: Middleware = socketMiddleware({
   connect: wsFeedConnect,
   disconnect: wsFeedDisconnect,
   onError: wsFeedError,
   onMessage: wsFeedMessage
})

const ordersMiddleware: Middleware = socketMiddleware({
   connect: wsProfileFeedConnect,
   disconnect: wsProfileFeedDisconnect,
   onError: wsProfileFeedError,
   onMessage: wsProfileFeedMessage,
}, true)

export const store = configureStore({
   reducer: { root: rootReducer },
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware)
   },
});