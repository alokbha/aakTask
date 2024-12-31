// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import testDataReducer from './slices/testDataSlice';

const store = configureStore({
  reducer: {
    testData: testDataReducer
  }
});

export default store;
