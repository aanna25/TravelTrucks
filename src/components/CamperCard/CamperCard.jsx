import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../../redux/campers/favoritesSlice";

import { BsStarFill, BsMap } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import style from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(camper.id));
  };

  const handleShowMore = () => {
    navigate(`/campers/${camper.id}`);
  };

  const formatPrice = (price) => {
    return `${price}.00`;
  };

  const getFeatures = () => {
    const features = [];

    if (camper.AC) features.push("AC");
    if (camper.kitchen) features.push("Kitchen");
    if (camper.TV) features.push("TV");
    if (camper.bathroom) features.push("Bathroom");
    if (camper.radio) features.push("Radio");
    if (camper.refrigerator) features.push("Refrigerator");
    if (camper.microwave) features.push("Microwave");
    if (camper.gas) features.push("Gas");
    if (camper.water) features.push("Water");

    return features.slice(0, 6); // показуємо максимум 6
  };

  return (
    <div className={style.card}>
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
                  camper.isFavorite ? style.active : ""
                }`}
                onClick={handleFavoriteToggle}
                aria-label={
                  camper.isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {camper.isFavorite ? (
                  <FaHeart className={style.heartIcon} /> // заповнене серце, якшо true
                ) : (
                  <FaRegHeart className={style.heartIcon} /> // контур, якшо  false
                )}
              </button>
            </div>
          </div>

          <div className={style.meta}>
            <div className={style.rating}>
              <BsStarFill className={style.starIcon} />
              <span className={style.ratingText}>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={style.location}>
              <BsMap className={style.locationIcon} />
              <span>{camper.location}</span>
            </div>
          </div>
        </div>

        <p className={style.description}>{camper.description}</p>

        <div className={style.features}>
          {getFeatures().map((feature, index) => (
            <span key={index} className={style.feature}>
              {feature}
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
