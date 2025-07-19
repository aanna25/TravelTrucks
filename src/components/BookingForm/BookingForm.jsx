import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
// import "react-datepicker/dist/react-datepicker.css";
import style from "./BookingForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bookingDate: Yup.date()
    .nullable()
    .required("Booking date is required")
    .min(new Date(), "Date cannot be in the past"),
  comment: Yup.string(),
});

const BookingForm = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = {
      name: values.name,
      email: values.email,
      bookingDate: values.bookingDate
        ? values.bookingDate.toISOString().split("T")[0]
        : "",
      comment: values.comment,
    };

    console.log("дані відправника:", formData);

    setTimeout(() => {
      // чистим форму після відправки
      resetForm();
      setSubmitting(false);
      alert("ваша заявка успішно відправлена!"); // змінити потім на ізітост?
    }, 100);
  };

  return (
    <div className={style.bookingFormContainer}>
      <h3 className={style.bookingFormTitle}>Book your campervan now</h3>
      <p className={style.bookingFormSubtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={style.bookingForm}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={style.formInput}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={style.errorMessage}
            />
            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={style.formInput}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={style.errorMessage}
            />
            <CustomDatePicker
              selectedDate={values.bookingDate}
              onDateChange={(date) => setFieldValue("bookingDate", date)}
              dateFormat="yyyy/MM/dd"
              placeholder="Booking date*"
              inputClassName={style.formInput}
              minDate={new Date()}
              showDisabledMonthNavigation
              isClearable
              // calendarClassName={style.myCustomCalendar}
            />
            <ErrorMessage
              name="bookingDate"
              component="div"
              className={style.errorMessage}
            />
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={style.formTextarea}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={style.errorMessage}
            />
            <button
              type="submit"
              className={style.formButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
