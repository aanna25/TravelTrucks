import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../../redux/campers/favoritesSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import SvgIcon from "../SvgIcon/SvgIcon";

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

    if (camper.AC)
      features.push({
        name: "AC",
        iconId: "icon-ac",
        iconClass: "featureIcon",
      });
    if (camper.kitchen)
      features.push({
        name: "Kitchen",
        iconId: "icon-kitchen",
        iconClass: "featureIcon",
      });
    if (camper.TV)
      features.push({
        name: "TV",
        iconId: "icon-tv",
        iconClass: "featureIcon",
      });
    if (camper.bathroom)
      features.push({
        name: "Bathroom",
        iconId: "icon-shower",
        iconClass: "featureIcon",
      });
    if (camper.radio)
      features.push({
        name: "Radio",
        iconId: "icon-radio",
        iconClass: "featureIcon",
      });
    if (camper.refrigerator)
      features.push({
        name: "Refrigerator",
        iconId: "icon-fridge",
        iconClass: "featureIcon",
      });
    if (camper.microwave)
      features.push({
        name: "Microwave",
        iconId: "icon-microwave",
        iconClass: "featureIcon",
      });
    if (camper.gas)
      features.push({
        name: "Gas",
        iconId: "icon-gas",
        iconClass: "featureIcon",
      });
    if (camper.water)
      features.push({
        name: "Water",
        iconId: "icon-water",
        iconClass: "featureIcon",
      });

    return features.slice(0, 6);
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
              <SvgIcon
                iconId={feature.iconId}
                className={style[feature.iconClass]}
              />
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
