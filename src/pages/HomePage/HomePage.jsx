import { useNavigate } from "react-router-dom";
import style from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNow = () => {
    navigate("/catalog");
  };
  return (
    <div className={style.homePageContainer}>
      <div className={style.heroContent}>
        <div className={style.heroTextWrapper}>
          <h1 className={style.heroTitle}>Campers of your dreams</h1>
          <p className={style.heroParagraph}>
            You can find everything you want in our catalog
          </p>
          <button
            type="button"
            onClick={handleViewNow}
            className={style.heroBtn}
          >
            View Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
