import { useParams, Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/operations";
import {
  selectCurrentCamper,
  selectCampersLoading,
  selectCampersError,
} from "../../redux/selectors";

import BookingForm from "../../components/BookingForm/BookingForm";
import Loader from "../../components/Loader/Loader";
import SvgIcon from "../../components/SvgIcon/SvgIcon";
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
      <div className={style.loadingContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className={style.errorMessage}>Error loading: {error}</div>;
  }

  if (!camper) {
    return <div className={style.notFoundMessage}>Camper not found.</div>;
  }

  const { name, price, rating, reviews, location, description, gallery } =
    camper;

  const formatPrice = (p) => (p ? `€${p.toFixed(2)}` : "N/A");

  return (
    <div className={style.container}>
      <div className={style.headerSection}>
        <h1 className={style.name}>{name}</h1>
        <div className={style.ratingLocation}>
          <p className={style.rating}>
            <SvgIcon iconId="icon-star" className={style.starIcon} /> {rating} (
            {reviews.length} Reviews)
          </p>
          <p className={style.location}>
            <SvgIcon iconId="icon-map" className={style.locationIcon} />{" "}
            {location}
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
        <BookingForm />
      </div>
    </div>
  );
};

export default CamperDetailsPage;
