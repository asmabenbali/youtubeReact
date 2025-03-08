import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    addComment: (state, action) => {
      const { videoId, comment } = action.payload;
      if (!state[videoId]) {
        state[videoId] = [];
      }
      state[videoId].push(comment);
    },

    // hna khsna id dyal vdy w commenatire lihnmodifiew w text lihtkon fih new comment

    updateComment: (state, action) => {
      const { videoId, commentId, newText } = action.payload;
      const comments = state[videoId];
      const commentIndex = comments.findIndex((c) => c.id === commentId);
      if (commentIndex !== -1) {
        comments[commentIndex].text = newText;
      }
    },
  },
});

export const { addComment, updateComment, deleteComment } =
  commentSlice.actions;
export default commentSlice.reducer;
