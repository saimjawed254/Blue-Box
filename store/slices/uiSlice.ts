import { createSlice } from "@reduxjs/toolkit";

const uiSlice=createSlice({
    name: "ui",
    initialState: {shadersVisible: true},
    reducers: {
        showShader: (state)=>{ state.shadersVisible = true;},
        hideShader: (state)=>{ state.shadersVisible = false;},
    }
})

export const {showShader,hideShader} = uiSlice.actions;
export default uiSlice.reducer;
