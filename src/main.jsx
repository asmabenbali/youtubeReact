import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { saveStateToLocalStorage } from "./utils/localStorageUtils.js";
import App from "./App.jsx";
import "./index.css";

// Step 3: Save state to localStorage whenever the store changes
store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage(state);
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
