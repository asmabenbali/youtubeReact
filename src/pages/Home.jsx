// pages/Home.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyFilters, setCurrentPage } from "../store/slices/videoSlice";
import VideoCard from "../components/VideoCard";
import Pagination from "../components/Pagination";
import SearchAndFilter from "../components/SearchAndFilter";

const Home = () => {
  const dispatch = useDispatch();
  const {
    filteredVideos,
    currentPage,
    videosPerPage,
    searchQuery,
    selectedPlaylist,
  } = useSelector((state) => state.videos);

  // Calculate paginated videos
  const indexOfLastVideo = currentPage * videosPerPage; // 6       [logic : bsh nkhdo 6 vdy mn allvdys li3ndna ]
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage; // 0
  // bsh nakhdo 6 vdy mn g3 videos dyalna 
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo, // thdid first
    indexOfLastVideo // thdid last
  );

  // Apply filters whenever search or playlist changes
  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, searchQuery, selectedPlaylist]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchAndFilter />


{/* // kndiro map 3la 6 vdy likhdinahom */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>


      <Pagination
        currentPage={currentPage}
        totalItems={filteredVideos.length}
        itemsPerPage={videosPerPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;
