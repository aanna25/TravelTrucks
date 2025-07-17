import { useParams, Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/operations";
import {
  selectCurrentCamper,
  selectCampersLoading,
  selectCampersError,
} from "../../redux/selectors";

import { BsStarFill, BsMap } from "react-icons/bs";
import style from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className={style.loadingMessage}>Loading camper details...</div>
    );
  }

  if (error) {
    return <div className={style.errorMessage}>Error loading: {error}</div>;
  }

  if (!camper) {
    return <div className={style.notFoundMessage}>Camper not found.</div>;
  }

  //  деструктуризуєм напряму з camper
  const { name, price, rating, reviews, location, description, gallery } =
    camper;

  const formatPrice = (p) => (p ? `€${p.toFixed(2)}` : "N/A");

  return (
    <div className={style.container}>
      <div className={style.headerSection}>
        <h1 className={style.name}>{name}</h1>
        <div className={style.ratingLocation}>
          <p className={style.rating}>
            <BsStarFill className={style.starIcon} /> {rating} ({reviews.length}{" "}
            Reviews)
          </p>
          <p className={style.location}>
            <BsMap className={style.locationIcon} /> {location}
          </p>
        </div>
        <p className={style.price}>{formatPrice(price)}</p>
      </div>

      <div className={style.gallery}>
        {gallery.map((imgObj, index) => (
          <img
            key={index}
            src={imgObj.original}
            alt={`${name} - ${index + 1}`}
            className={style.galleryImage}
          />
        ))}
      </div>

      <p className={style.description}>{description}</p>

      <nav className={style.navigation}>
        <Link to="features" className={style.navLink}>
          Features
        </Link>
        <Link to="reviews" className={style.navLink}>
          Reviews
        </Link>
      </nav>

      <div className={style.contentAndForm}>
        <div className={style.outletContent}>
          <Outlet />
        </div>

        <div className={style.bookingFormContainer}>
          <h3 className={style.bookingFormTitle}>Book your campervan now</h3>
          <p className={style.bookingFormSubtitle}>
            Stay connected! We are always ready to help you.
          </p>
          <form className={style.bookingForm}>
            <input
              type="text"
              placeholder="Name*"
              className={style.formInput}
              required
            />
            <input
              type="email"
              placeholder="Email*"
              className={style.formInput}
              required
            />
            <input
              type="date"
              placeholder="Booking date"
              className={style.formInput}
              required
            />
            <textarea
              placeholder="Comment"
              className={style.formTextarea}
            ></textarea>
            <button type="submit" className={style.formButton}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;

// не забути закинути потім форму окремо
