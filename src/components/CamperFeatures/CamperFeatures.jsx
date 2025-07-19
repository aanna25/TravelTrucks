import { useSelector } from "react-redux";
import { selectCurrentCamper } from "../../redux/selectors";
import SvgIcon from "../SvgIcon/SvgIcon";
import Loader from "../Loader/Loader";
import style from "./CamperFeatures.module.css";

const CamperFeatures = () => {
  const camper = useSelector(selectCurrentCamper);

  if (!camper) {
    return (
      <div className={style.loadingContainer}>
        <Loader />
      </div>
    );
  }

  const {
    form,
    length,
    width,
    height,
    tank,
    consumption,
    engine,
    transmission,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const featuresToDisplay = [
    { condition: AC, iconId: "icon-ac", text: "AC" },
    {
      condition: transmission === "automatic",
      iconId: "icon-automatic",
      text: "Automatic",
    },
    {
      condition: engine === "petrol",
      iconId: "icon-petrol",
      text: "Petrol",
    },
    { condition: kitchen, iconId: "icon-kitchen", text: "Kitchen" },
    { condition: TV, iconId: "icon-tv", text: "TV" },
    { condition: radio, iconId: "icon-radio", text: "Radio" },
    { condition: refrigerator, iconId: "icon-fridge", text: "Refrigerator" },
    { condition: microwave, iconId: "icon-microwave", text: "Microwave" },
    { condition: bathroom, iconId: "icon-shower", text: "Bathroom" },
    { condition: gas, iconId: "icon-gas", text: "Gas" },
    { condition: water, iconId: "icon-water", text: "Water" },
  ];

  return (
    <div className={style.featuresContainer}>
      <ul className={style.featuresList}>
        {featuresToDisplay.map(
          (feature) =>
            feature.condition && (
              <li key={feature.iconId} className={style.featureItem}>
                <SvgIcon
                  iconId={feature.iconId}
                  className={style.featureIcon}
                />
                {feature.text}
              </li>
            )
        )}
      </ul>

      <h3 className={style.sectionTitle}>Vehicle details</h3>
      <ul className={style.detailsList}>
        <li key="form" className={style.detailItem}>
          <span>Form</span>
          <span>{form}</span>
        </li>
        <li key="length" className={style.detailItem}>
          <span>Length</span>
          <span>{length}</span>
        </li>
        <li key="width" className={style.detailItem}>
          <span>Width</span>
          <span>{width}</span>
        </li>
        <li key="height" className={style.detailItem}>
          <span>Height</span>
          <span>{height}</span>
        </li>
        <li key="tank" className={style.detailItem}>
          <span>Tank</span>
          <span>{tank}</span>
        </li>
        <li key="consumption" className={style.detailItem}>
          <span>Consumption</span>
          <span>{consumption}</span>
        </li>
      </ul>
    </div>
  );
};

export default CamperFeatures;
