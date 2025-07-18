import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../../redux/campers/favoritesSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import SvgIcon from "../SvgIcon/SvgIcon";
import style from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);
  const isFavorite = favoriteIds.includes(camper.id);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(camper.id));
  };

  const handleShowMore = () => {
    navigate(`/campers/${camper.id}`);
  };

  const formatPrice = (price) => `${price}.00`;

  const getFeatures = () => {
    const features = [];
    if (camper.AC) features.push({ name: "AC", iconId: "icon-ac" });
    if (camper.kitchen)
      features.push({ name: "Kitchen", iconId: "icon-kitchen" });
    if (camper.TV) features.push({ name: "TV", iconId: "icon-tv" });
    if (camper.bathroom)
      features.push({ name: "Bathroom", iconId: "icon-shower" });
    if (camper.radio) features.push({ name: "Radio", iconId: "icon-radio" });
    if (camper.refrigerator)
      features.push({ name: "Refrigerator", iconId: "icon-fridge" });
    if (camper.microwave)
      features.push({ name: "Microwave", iconId: "icon-microwave" });
    if (camper.gas) features.push({ name: "Gas", iconId: "icon-gas" });
    if (camper.water) features.push({ name: "Water", iconId: "icon-water" });
    return features.slice(0, 6);
  };

  return (
    <div className={style.card} onClick={handleShowMore}>
      <div className={style.imageContainer}>
        <img
          src={camper.gallery?.[0]?.thumb || "/placeholder-camper.jpg"}
          alt={camper.name}
          className={style.image}
        />
      </div>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style.titleRow}>
            <h3 className={style.name}>{camper.name}</h3>
            <div className={style.priceAndFavorite}>
              <span className={style.price}>€{formatPrice(camper.price)}</span>
              <button
                type="button"
                className={`${style.favoriteButton} ${
                  isFavorite ? style.active : ""
                }`}
                onClick={handleFavoriteToggle}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isFavorite ? (
                  <FaHeart className={style.heartIcon} />
                ) : (
                  <FaRegHeart className={style.heartIcon} />
                )}
              </button>
            </div>
          </div>
          <div className={style.meta}>
            <div className={style.rating}>
              <SvgIcon iconId="icon-star" className={style.starIcon} />
              <span className={style.ratingText}>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={style.location}>
              <SvgIcon iconId="icon-map" className={style.locationIcon} />
              <span>{camper.location}</span>
            </div>
          </div>
        </div>
        <p className={style.description}>{camper.description}</p>
        <div className={style.features}>
          {getFeatures().map((feature, index) => (
            <span key={index} className={style.feature}>
              <SvgIcon iconId={feature.iconId} className={style.featureIcon} />
              {feature.name}
            </span>
          ))}
        </div>
        <button
          type="button"
          className={style.showMoreButton}
          onClick={handleShowMore}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
