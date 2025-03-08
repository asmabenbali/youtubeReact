// Le composant SearchAndFilter sert à rechercher et filtrer 
// des vidéos dans une application React. Il utilise useState pour gérer 
// les entrées de recherche et de playlist, et useSelector/useDispatch de react-redux pour 
// synchroniser l'état global. Il inclut un champ de texte pour rechercher des vidéos et une liste
//  déroulante pour choisir une playlist parmi celles définies dans playlists, avec des mises à jour en 
// temps réel de l'état. Un mécanisme de debounce (commenté) est prévu pour appliquer les filtres après 300 ms. 
// En bref, il offre une interface simple et réactive pour filtrer et naviguer dans les vidéos.



// components/SearchAndFilter.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSelectedPlaylist,
} from "../store/slices/videoSlice";
import { playlists } from "../data/data";

const SearchAndFilter = () => {
  const dispatch = useDispatch();
  const { selectedPlaylist, searchQuery } = useSelector(
    (state) => state.videos
  );

  const [search, setSearch] = useState(searchQuery || "");
  const [selected, setSelected] = useState(selectedPlaylist | "");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilter = (e) => {
    setSelected(e.target.value);
    dispatch(setSelectedPlaylist(+e.target.value || null));
  };

  // Apply filters after 300ms debounce
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     dispatch(applyFilters());
  //   }, 300);
  //   return () => clearTimeout(timeoutId);
  // }, [search, selected, dispatch]);

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Rechercher des vidéos..."
        value={search}
        onChange={handleSearch}
        className="flex-1 p-2 rounded-lg border dark:text-white dark:bg-gray-700 dark:border-gray-600"
      />

      <select
        value={selected}
        onChange={handleFilter}
        className="p-2 rounded-lg border dark:text-white dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">Toutes les playlists</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.titre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
