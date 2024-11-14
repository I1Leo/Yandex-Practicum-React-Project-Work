import { feedSlice, initialState, setCurrentFeedOrder, wsFeedError, wsFeedMessage } from "./feed-slice";

const testErrorMessage = "Test error!";

const testFeedResponse = {
   "success": true,
   "orders": [
      {
         "ingredients": [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea"
         ],
         "_id": "",
         "status": "done",
         "number": 0,
         "createdAt": "2021-06-23T14:43:22.587Z",
         "updatedAt": "2021-06-23T14:43:22.603Z"
      }
   ],
   "total": 1,
   "totalToday": 1
};

const testFeedOrder = {
   "_id": "673632a1b27b06001c3e837a",
   "ingredients": [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa093d"
   ],
   "status": "done",
   "name": "Флюоресцентный люминесцентный био-марсианский бургер",
   "createdAt": "2024-11-14T17:25:53.088Z",
   "updatedAt": "2024-11-14T17:25:54.483Z",
   "number": 59438
}

describe("feedSlice reducers check", () => {
   it('correct initial state', () => {
      const state = feedSlice.reducer(undefined, { type: undefined });

      expect(state).toEqual(initialState);
   });

   it("wsFeedError", () => {
      const action = { type: wsFeedError.type, payload: testErrorMessage };

      const state = feedSlice.reducer(initialState, action);

      expect(state).toEqual({ ...initialState, connectionError: testErrorMessage });
   })

   it("wsFeedMessage", () => {
      const action = { type: wsFeedMessage.type, payload: testFeedResponse };

      const state = feedSlice.reducer(initialState, action);

      expect(state).toEqual({ ...initialState, feed: testFeedResponse });
   })

   it("setCurrentFeedOrder", () => {
      const action = { type: setCurrentFeedOrder.type, payload: testFeedOrder };

      const state = feedSlice.reducer(initialState, action);

      expect(state).toEqual({...initialState, currentOrder: testFeedOrder})
   })
})