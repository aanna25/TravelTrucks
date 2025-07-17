import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../../redux/campers/campersSlice";
import { selectFilters } from "../../redux/selectors";
import { fetchCampers } from "../../redux/operations";
import {
  BsWind,
  BsCupHot,
  BsMap,
  BsGrid1X2,
  BsGrid,
  BsGrid3X3Gap,
} from "react-icons/bs";
import { MdOutlineBathroom } from "react-icons/md";
import { HiOutlineTv } from "react-icons/hi2";
import { FaCarSide } from "react-icons/fa";

import style from "./FilterPanel.module.css";

const vehicleTypes = [
  { value: "panel", label: "Van", icon: <BsGrid1X2 /> },
  { value: "fully_integrated", label: "Full-Integrated", icon: <BsGrid /> },
  { value: "alcove", label: "Alcove", icon: <BsGrid3X3Gap /> },
];

const equipmentOptions = [
  { value: "AC", label: "AC", icon: <BsWind /> },
  { value: "transmission", label: "Automatic", icon: <FaCarSide /> },
  { value: "kitchen", label: "Kitchen", icon: <BsCupHot /> },
  { value: "TV", label: "TV", icon: <HiOutlineTv /> },
  { value: "bathroom", label: "Bathroom", icon: <MdOutlineBathroom /> },
];

const FilterPanel = ({ className }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(selectFilters);

  // локальний стан фільтрів
  const [location, setLocation] = useState(currentFilters.location || "");
  const [bodyType, setBodyType] = useState(currentFilters.bodyType || "");
  const [features, setFeatures] = useState(currentFilters.features || []);

  useEffect(() => {
    setLocation(currentFilters.location || "");
    setBodyType(currentFilters.bodyType || "");
    setFeatures(currentFilters.features || []);
  }, [currentFilters]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // const handleBodyTypeChange = (e) => {
  //   setBodyType(e.target.value);
  // };

  const handleBodyTypeClick = (value) => {
    setBodyType((prevBodyType) => (prevBodyType === value ? "" : value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFilters = { location, bodyType, features };
    console.log("Submitting filters:", newFilters);

    // оновлюєм фільтри в redux
    dispatch(setFilters(newFilters));

    // потім завантажуєм кемпери з новими фільтрами
    dispatch(
      fetchCampers({
        page: 1,
        limit: 4,
        filters: newFilters,
      })
    );
  };

  const handleReset = () => {
    console.log("Resetting filters");
    dispatch(resetFilters());

    // скидуєм фільтри і завантажуєм кемпери без фільтрів
    dispatch(
      fetchCampers({
        page: 1,
        limit: 4,
        filters: {},
      })
    );
  };

  return (
    <div className={`${style.filterPanel} ${className}`}>
      <form onSubmit={handleSubmit} className={style.filterForm}>
        <div className={style.filterGroup}>
          <label
            htmlFor="location"
            className={`${style.label} ${location ? style.activeLabel : ""}`}
          >
            Location
          </label>
          <div className={style.inputWrapper}>
            <BsMap
              className={`${style.icon} ${location ? style.activeIcon : ""}`}
            />
            <input
              type="text"
              id="location"
              className={style.textInput}
              placeholder="City"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        </div>
        <label htmlFor="filters" className={style.label}>
          Filters
        </label>
        <div className={style.filterGroup}>
          <p className={style.subTitle}>Vehicle equipment</p>
          <div className={style.iconButtonGroup}>
            {equipmentOptions.map((option) => {
              const isActive = features.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`${style.iconButton} ${
                    isActive ? style.active : ""
                  }`}
                  onClick={() => {
                    setFeatures((prev) =>
                      isActive
                        ? prev.filter((item) => item !== option.value)
                        : [...prev, option.value]
                    );
                  }}
                >
                  <span className={style.iconButtonIcon}>{option.icon}</span>
                  <span className={style.iconButtonLabel}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className={style.filterGroup}>
          <p className={style.subTitle}>Vehicle type</p>
          <div className={style.iconButtonGroup}>
            {vehicleTypes.map((type) => {
              const isActive = bodyType === type.value;

              return (
                <button
                  key={type.value}
                  type="button"
                  className={`${style.iconButton} ${
                    isActive ? style.active : ""
                  }`}
                  onClick={() => handleBodyTypeClick(type.value)}
                >
                  <span className={style.iconButtonIcon}>{type.icon}</span>
                  <span className={style.iconButtonLabel}>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className={style.buttonWrap}>
          <button type="submit" className={style.searchButton}>
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={style.resetButton}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;
