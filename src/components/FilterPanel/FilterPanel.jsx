import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/campers/campersSlice";
import { selectFilters } from "../../redux/selectors";
import { fetchCampers } from "../../redux/operations";
import SvgIcon from "../SvgIcon/SvgIcon";
import style from "./FilterPanel.module.css";

const vehicleTypes = [
  { value: "panel", label: "Van", iconId: "icon-van" },
  {
    value: "fully_integrated",
    label: "Full-Integrated",
    iconId: "icon-fully-integrated",
  },
  { value: "alcove", label: "Alcove", iconId: "icon-alcove" },
];

const equipmentOptions = [
  { value: "AC", label: "AC", iconId: "icon-ac" },
  { value: "transmission", label: "Automatic", iconId: "icon-automatic" },
  { value: "kitchen", label: "Kitchen", iconId: "icon-kitchen" },
  { value: "TV", label: "TV", iconId: "icon-tv" },
  { value: "bathroom", label: "Bathroom", iconId: "icon-shower" },
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
            <SvgIcon
              iconId="icon-map"
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

        <div className={style.filtersSection}>
          <p className={style.title}>Filters</p>

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
                    <SvgIcon
                      iconId={option.iconId}
                      className={style.iconButtonIcon}
                    />
                    <span className={style.iconButtonLabel}>
                      {option.label}
                    </span>
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
                    <SvgIcon
                      iconId={type.iconId}
                      className={style.iconButtonIcon}
                    />
                    <span className={style.iconButtonLabel}>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={style.buttonWrap}>
          <button type="submit" className={style.searchButton}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;
