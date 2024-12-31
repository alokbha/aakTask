// src/store/slices/testDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestDataState {
  data: { date: string, value: number }[];
}

const initialState: TestDataState = {
  data: [],
};

const testDataSlice = createSlice({
  name: 'testData',
  initialState,
  reducers: {
    setTestData: (state, action: PayloadAction<{ date: string, value: number }[]>) => {
      state.data = action.payload;
    }
  }
});

export const { setTestData } = testDataSlice.actions;
export default testDataSlice.reducer;
