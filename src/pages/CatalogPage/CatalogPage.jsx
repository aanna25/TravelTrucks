import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import CamperCard from "../../components/CamperCard/CamperCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import style from "./CatalogPage.module.css";
import {
  // selectCampers,
  selectCampersWithFavorites,
  selectCampersLoading,
  selectCurrentPage,
  selectHasMore,
  selectFavoriteIds,
  selectFilters,
} from "../../redux/selectors";
import { fetchCampers } from "../../redux/operations";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/campers/favoritesSlice";
import { setPage, resetCampers } from "../../redux/campers/campersSlice";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const campers = useSelector(selectCampersWithFavorites);
  const loading = useSelector(selectCampersLoading);
  const page = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);
  const favorites = useSelector(selectFavoriteIds);
  const filters = useSelector(selectFilters);

  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    const filtersChanged =
      JSON.stringify(filters) !== JSON.stringify(prevFiltersRef.current);

    if (filtersChanged) {
      dispatch(resetCampers());
      prevFiltersRef.current = filters;
      return;
    }

    dispatch(fetchCampers({ page, limit: 4, filters }));
  }, [dispatch, page, filters]);

  const handleToggleFavorite = (camperId) => {
    if (favorites.includes(camperId)) {
      dispatch(removeFromFavorites(camperId));
    } else {
      dispatch(addToFavorites(camperId));
    }
  };

  const handleShowMore = (id) => {
    navigate(`/catalog/${id}`);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(setPage(page + 1));
    }
  };

  if (loading && campers.length === 0) {
    return <Loader />;
  }

  return (
    <div className={style.catalog}>
      <FilterPanel />
      <div className={style.content}>
        <div className={style.cards}>
          {campers.length > 0
            ? campers.map((camper) => (
                <CamperCard
                  key={camper.id}
                  camper={camper}
                  isFavorite={favorites.includes(camper.id)}
                  onToggleFavorite={() => handleToggleFavorite(camper.id)}
                  onShowMore={() => handleShowMore(camper.id)}
                />
              ))
            : !loading && (
                <p className={style.noResults}>
                  No campers found matching your criteria.
                </p>
              )}
        </div>
        {hasMore && campers.length > 0 && (
          <button
            className={style.loadMore}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
