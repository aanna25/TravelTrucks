import { useSelector } from "react-redux";
import { selectCurrentCamper } from "../../redux/selectors";
import { BsStarFill } from "react-icons/bs";
import style from "./CamperReviews.module.css";

const CamperReviews = () => {
  const camper = useSelector(selectCurrentCamper);

  // якшо кемпер не завантажений чі не має відгуків виводимо текст
  if (!camper || !camper.reviews || camper.reviews.length === 0) {
    return (
      <p className={style.noReviewsMessage}>
        There are no reviews for the selected camper yet.
      </p>
    );
  }

  const { reviews } = camper;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        // якщо зірка заповнена то жовта
        stars.push(<BsStarFill key={i} className={style.filledStar} />);
      } else {
        // якшо ні то сіра
        stars.push(<BsStarFill key={i} className={style.emptyStar} />);
      }
    }
    return stars;
  };

  return (
    <div className={style.reviewsContainer}>
      <ul className={style.reviewsList}>
        {reviews.map((review, index) => (
          <li key={review.reviewer_name + index} className={style.reviewItem}>
            <div className={style.reviewerInfo}>
              <div className={style.avatarPlaceholder}>
                {review.reviewer_name.charAt(0).toUpperCase()}
              </div>
              <div className={style.nameAndRating}>
                <p className={style.reviewerName}>{review.reviewer_name}</p>
                <div className={style.starRating}>
                  {renderStars(review.reviewer_rating)}
                </div>
              </div>
            </div>
            <p className={style.reviewComment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CamperReviews;
