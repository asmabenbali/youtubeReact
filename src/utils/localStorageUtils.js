// Step 1: Save State to Local Storage

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("rootState", serializedState);
  } catch (error) {
    console.error("Could not save state to localStorage:", error);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("rootState");
    if (serializedState === null) {
      return undefined; // No saved state
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state from localStorage:", error);
    return undefined;
  }
};
