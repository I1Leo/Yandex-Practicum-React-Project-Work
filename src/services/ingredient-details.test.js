import { activateIngredientsDetailsModal, deactivateIngredientsDetailsModal, getIngredientDetails, ingredientDetailsSlice, initialState } from "./ingredient-details";

const testIngredient = {
   "_id": "643d69a5c3f7b9001cfa093e",
   "name": "Филе Люминесцентного тетраодонтимформа",
   "type": "main",
   "proteins": 44,
   "fat": 26,
   "carbohydrates": 85,
   "calories": 643,
   "price": 988,
   "image": "https://code.s3.yandex.net/react/code/meat-03.png",
   "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
   "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
   "__v": 0
}

describe("ingredientDetailsSlice reducers check", () => {
   it("correct initial state", () => {
      const state = ingredientDetailsSlice.reducer(undefined, { type: undefined });
      expect(state).toEqual(initialState);
   })

   it("getIngredientDetail", () => {
      const action = { type: getIngredientDetails.type, payload:  testIngredient};

      const state = ingredientDetailsSlice.reducer(initialState, action);

      expect(state).toEqual({...initialState, ingredientDetails: testIngredient})
   })

   it("activateIngredientsDetailsModal", () => {
      const action = { type: activateIngredientsDetailsModal.type };

      const state = ingredientDetailsSlice.reducer(initialState, action);

      expect(state).toEqual({...initialState, isIngredientDetailsModalActive: true})
   })

   it("deactivateIngredientsDetailsModal", () => {
      const action = { type: deactivateIngredientsDetailsModal.type };

      const state = ingredientDetailsSlice.reducer(initialState, action);

      expect(state).toEqual({...initialState, isIngredientDetailsModalActive: false})
   })
})