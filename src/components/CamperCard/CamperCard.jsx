import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../../redux/campers/favoritesSlice";
import styles from "./CamperCard.module.css";

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
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={camper.gallery?.[0]?.thumb || "/placeholder-camper.jpg"}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h3 className={styles.name}>{camper.name}</h3>
            <div className={styles.priceAndFavorite}>
              <span className={styles.price}>€{formatPrice(camper.price)}</span>
              <button
                type="button"
                className={`${styles.favoriteButton} ${
                  camper.isFavorite ? styles.active : ""
                }`}
                onClick={handleFavoriteToggle}
                aria-label={
                  camper.isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {/* <heartIcon /> */}
              </button>
            </div>
          </div>

          <div className={styles.meta}>
            <div className={styles.rating}>
              {/* <StarIcon /> */}
              <span className={styles.ratingText}>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              {/* <locationIcon /> */}
              <span>{camper.location}</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {getFeatures().map((feature, index) => (
            <span key={index} className={styles.feature}>
              {feature}
            </span>
          ))}
        </div>

        <button
          type="button"
          className={styles.showMoreButton}
          onClick={handleShowMore}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
