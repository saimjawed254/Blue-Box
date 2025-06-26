import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  shadersVisible: boolean;
  shaderOwner: "none" | "landing" | "home" | "na";
}

const initialState: UIState = {
  shadersVisible: true,
  shaderOwner: "landing",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showShader: (state) => {
      state.shadersVisible = true;
    },
    hideShader: (state) => {
      state.shadersVisible = false;
    },
    setShaderOwner: (state, action: PayloadAction<"none" | "landing" | "home" | "na">) => {
      state.shaderOwner = action.payload;
    },
  },
});

export const { showShader, hideShader, setShaderOwner } = uiSlice.actions;
export default uiSlice.reducer;
