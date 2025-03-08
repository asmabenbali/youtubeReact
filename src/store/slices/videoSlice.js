// redux/slices/videoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { playlists } from "../../data/data";


//g3 vdy jm3nahom b flatmap
const allVideos = playlists.flatMap((playlist) => playlist.videos);

const initialState = {
  allVideos: allVideos,
  filteredVideos: allVideos,
  // currentVideo: null,
  favorites: [],
  currentPage: 1, // page lifiha hna db
  videosPerPage: 6, // vdy li f page
  searchQuery: "",  //dkshy li kydkhl user searching 
  selectedPlaylist: null, //id playlist li ktarinha mn playlist lihda search
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {

    applyFilters: (state) => {
      let filtered = [...state.allVideos];

      // Apply search filter : kdir filtre vdy 3la hsab titre li dkhl user 
      if (state.searchQuery) {
        filtered = filtered.filter((video) =>
          video.titre.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }



      // Apply playlist filter : fsh user kykhtar playlist frah kn3tiwh vdys lifiha
      if (state.selectedPlaylist) {
        filtered = playlists.find(
          (playlist) => playlist.id === state.selectedPlaylist
        ).videos;
       
      }

      // vdys li f  f playlist li tkhtart kykono f  state.filteredVideos
      state.filteredVideos = filtered;
      state.currentPage = 1; // Reset to first page when filters change
    },



    // ajouter list favorites ola knhydoh mnha 
    toggleFavorite: (state, action) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },

    // hta ktkhtar vdy 3ad ktkhdm

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

    // r9m litkhtar knhtoh hnaya
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // dyal search
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // select playlist
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
  },
});

// action bsh nkhdmohom fl home page
export const {
  applyFilters, // search and filtre
  toggleFavorite, // favorise
  setCurrentPage, // paginations
  setSearchQuery, // lidkhl user f serach
  setSelectedPlaylist, // playlist litkhtrt
  likeVideo, //
  dislikeVideo, //
} = videoSlice.actions;

export default videoSlice.reducer;
