import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import style from "./BookingForm.module.css";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      bookingDate: bookingDate ? bookingDate.toISOString().split("T")[0] : "",
      comment,
    };

    console.log("дані відправника:", formData);

    // чистим форму після відправки
    setName("");
    setEmail("");
    setBookingDate(null);
    setComment("");

    alert("ваша заявка успішно відправлена!"); // змінити потім на ізітост?
  };

  return (
    <div className={style.bookingFormContainer}>
      <h3 className={style.bookingFormTitle}>Book your campervan now</h3>
      <p className={style.bookingFormSubtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={style.bookingForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name*"
          className={style.formInput}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email*"
          className={style.formInput}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DatePicker
          selected={bookingDate}
          onChange={(date) => setBookingDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="Booking date*"
          className={style.formInput}
          minDate={new Date()}
          showDisabledMonthNavigation
          isClearable
          calendarClassName={style.myCustomCalendar}
        />
        <textarea
          placeholder="Comment"
          className={style.formTextarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit" className={style.formButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
