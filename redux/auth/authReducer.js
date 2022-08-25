import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    email: null,
    login: null,
  },
  reducers: {},
});

export default authSlice;
