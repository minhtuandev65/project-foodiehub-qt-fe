import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from './middleware/logger.jsx';
import rootReducer from "./reducer/rootReducer.jsx";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
