import { authSlice, initialState, login, logout, setIsAuthChecked, setUser, updateUser } from "./auth";

const testUser = {
   email: "123@yandex.ru",
   name: "testUserName"
}

const testLoginResponse = {
   "success": true,
   "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjA2MDkyMTE5ZDQ1MDAxYjUwODY5OSIsImlhdCI6MTczMTYwMzUwOCwiZXhwIjoxNzMxNjA0NzA4fQ.OhdJrSMBxMJLsFEJlbYFgU5sU6hvD5RtKAZl4OcgfZw",
   "refreshToken": "9411187227d941f82895eac20f98f2a7d0b503badf080de4c231354554e9fabd065edf0b6f2ed53d",
   "user": {
       "email": "123@yandex.ru",
       "name": "testUserName"
   }
}

const testUpdateUserResponse = {
   "success": true,
   "user": {
       "email": "123@yandex.ru",
       "name": "testUserName"
   }
}

describe('authSlice reducers check', () => {
   it('correct initial state', () => {
      const state= authSlice.reducer(undefined, { type: undefined });

      expect(state).toEqual(initialState);
   });

   it('setIsAuthChecked', () => {
      const action = { type: setIsAuthChecked.type, payload: true };

      const state = authSlice.reducer(initialState, action);

      expect(state).toEqual({...initialState, isAuthChecked: true});
   });

   it('setUser', () => {
      const action = { type: setUser.type, payload: testUser };
      
      const state = authSlice.reducer(initialState, action);

      expect(state).toEqual({...initialState, user: testUser});
   });

   it('updateUser fulfilled', () => {
      const action = { type: updateUser.fulfilled.type, payload: testUpdateUserResponse };

      const state = authSlice.reducer(initialState, action);

      expect(state).toEqual({...initialState, user: testUser});
   });

   it('login fulfilled', () => {
      const action = { type: login.fulfilled.type, payload: testLoginResponse};

      const state = authSlice.reducer(initialState, action);

      expect(state).toEqual({user: testUser, isAuthChecked: true});
   });

   it('logout fulfilled', () => {
      const prevState = {...initialState, user: testUser};

      const action = { type: logout.fulfilled.type };
      
      const state = authSlice.reducer(prevState, action);

      expect(state).toEqual(initialState);
   });
});
