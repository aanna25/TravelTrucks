import { useSelector } from "react-redux";
import { selectCurrentCamper } from "../../redux/selectors";

import { BsWind, BsCupHot, BsUiRadios } from "react-icons/bs";
import { FaGasPump } from "react-icons/fa";
import { MdOutlineGasMeter } from "react-icons/md";
import { LuRefrigerator, LuMicrowave } from "react-icons/lu";
import { HiOutlineTv } from "react-icons/hi2";
import { IoWaterOutline } from "react-icons/io5";

import { PiShower } from "react-icons/pi";
import { BsBezier } from "react-icons/bs";

import style from "./CamperFeatures.module.css";

const CamperFeatures = () => {
  const camper = useSelector(selectCurrentCamper);

  if (!camper) {
    return <div className={style.loadingMessage}>Loading...</div>;
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
    { condition: AC, icon: BsWind, text: "AC" },
    {
      condition: transmission === "automatic",
      icon: BsBezier,
      text: "Automatic",
    },
    { condition: engine === "petrol", icon: FaGasPump, text: "Petrol" },
    { condition: kitchen, icon: BsCupHot, text: "Kitchen" },
    { condition: TV, icon: HiOutlineTv, text: "TV" },
    { condition: radio, icon: BsUiRadios, text: "Radio" },
    { condition: refrigerator, icon: LuRefrigerator, text: "Refrigerator" },
    { condition: microwave, icon: LuMicrowave, text: "Microwave" },
    { condition: bathroom, icon: PiShower, text: "Bathroom" },
    { condition: gas, icon: MdOutlineGasMeter, text: "Gas" },
    { condition: water, icon: IoWaterOutline, text: "Water" },
  ];

  return (
    <div className={style.featuresContainer}>
      <ul className={style.featuresList}>
        {featuresToDisplay.map(
          (feature, index) =>
            feature.condition && (
              <li key={index} className={style.featureItem}>
                <feature.icon className={style.featureIcon} /> {feature.text}
              </li>
            )
        )}
      </ul>

      <h3 className={style.sectionTitle}>Vehicle details</h3>
      <ul className={style.detailsList}>
        <li className={style.detailItem}>Form: {form}</li>
        <li className={style.detailItem}>Length: {length}</li>
        <li className={style.detailItem}>Width: {width}</li>
        <li className={style.detailItem}>Height: {height}</li>
        <li className={style.detailItem}>Tank: {tank}</li>
        <li className={style.detailItem}>Consumption: {consumption}</li>
      </ul>
    </div>
  );
};

export default CamperFeatures;
