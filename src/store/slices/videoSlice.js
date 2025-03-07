// redux/slices/videoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { playlists } from "../../data/data";

const allVideos = playlists.flatMap((playlist) => playlist.videos);

const initialState = {
  allVideos: allVideos,
  filteredVideos: allVideos,
  // currentVideo: null,
  favorites: [],
  currentPage: 1,
  videosPerPage: 6,
  searchQuery: "",
  selectedPlaylist: null,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    applyFilters: (state) => {
      let filtered = [...state.allVideos];

      // Apply search filter
      if (state.searchQuery) {
        filtered = filtered.filter((video) =>
          video.titre.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Apply playlist filter
      if (state.selectedPlaylist) {
        filtered = playlists.find(
          (playlist) => playlist.id === state.selectedPlaylist
        ).videos;
        // filtered = filtered.filter((video) =>
        //   playlists.some(
        //     (playlist) =>
        //       playlist.id === state.selectedPlaylist &&
        //       playlist.videos.some((v) => v.id === video.id)
        //   )
        // );
      }

      state.filteredVideos = filtered;
      state.currentPage = 1; // Reset to first page when filters change
    },
    toggleFavorite: (state, action) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    likeVideo: (state, action) => {
      const video = state.allVideos.find((v) => v.id === action.payload);
      if (video) {
        // If the video is already disliked, remove the dislike
        if (video.dislikes > 0) {
          video.dislikes -= 1;
        }

        // Increment likes
        video.likes += 1;
      }
    },
    dislikeVideo: (state, action) => {
      const video = state.allVideos.find((v) => v.id === action.payload);
      if (video) {
        // If the video is already liked, remove the like
        if (video.likes > 0) {
          video.likes -= 1;
        }

        // Increment dislikes
        video.dislikes += 1;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
  },
});

export const {
  applyFilters,
  toggleFavorite,
  setCurrentPage,
  setSearchQuery,
  setSelectedPlaylist,
  likeVideo,
  dislikeVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
