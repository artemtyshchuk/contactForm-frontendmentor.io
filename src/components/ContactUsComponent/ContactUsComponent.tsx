import styles from "./ContactUsComponent.module.scss";
import { ReactComponent as CkeckBoxIcon } from "assets/images/CheckboxIcon.svg";
import { ReactComponent as ActiveCheckBoxIcon } from "assets/images/icon-checkbox-check.svg";
import { ReactComponent as ActiveRadioButton } from "assets/images/icon-radio-selected.svg";
import { ReactComponent as InactiveRadioIcon } from "assets/images/RadioIcon.svg";
import { Notification } from "components/Notification";
import { useState } from "react";
import { ContactUsComponentTypes, NotificationType } from "types";

interface ContactUsComponentProps {
  onSubmit: (data: ContactUsComponentTypes) => void;
}

type EnquiryType = "General Enquiry" | "Support Request" | null;

export const ContactUsComponent = ({ onSubmit }: ContactUsComponentProps) => {
  const [selectedValue, setSelectedValue] = useState<EnquiryType>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const [notification, setNotification] = useState<NotificationType>({
    active: false,
    message: "",
    error: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    checkbox: false,
  });

  const handleNotification = (result: NotificationType) => {
    setNotification({
      active: true,
      error: result.error,
      message: result.message,
    });

    console.log("first", notification);

    setTimeout(() => {
      setNotification({
        active: false,
        error: false,
        message: "",
      });
    }, 2000);
    console.log("second", notification);
  };

  const handleRadioChange = (value: EnquiryType) => {
    setSelectedValue(value);
    setFormErrors((prevErrors) => ({ ...prevErrors, queryType: [] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: [] }));
  };

  const validateForm = (data: { [key: string]: any }) => {
    const errors: { [key: string]: string[] } = {};

    if (!data.firstName) {
      errors.firstName = ["First Name is required"];
    }
    if (!data.lastName) {
      errors.lastName = ["Last Name is required"];
    }
    if (!data.email) {
      errors.email = ["Email Address is required"];
    }
    if (!data.queryType) {
      errors.queryType = ["Please select a query type"];
    }
    if (!data.message) {
      errors.message = ["Message is required"];
    }
    if (!data.checkbox) {
      errors.checkbox = [
        "To submit this form, please consent to being contacted",
      ];
    }

    return errors;
  };

  const fetchNewForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);

      const data = {
        id: Math.floor(Math.random() * 1000),
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        queryType: selectedValue,
        message: formData.get("message") as string,
        checkbox: isChecked,
      };

      const errors = validateForm(data);

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            data,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const dataJson = (await response.json()) as ContactUsComponentTypes;
        onSubmit(dataJson);
        setErrorMessage("");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          queryType: "",
          message: "",
          checkbox: false,
        });
        setSelectedValue(null);
        setIsChecked(false);
        handleNotification({
          active: true,
          error: false,
          message: "Message Sent!",
        });
      } else {
        setErrorMessage("Response not ok. Something went wrong.");
        handleNotification({
          active: true,
          error: true,
          message: "Message Not Sent!",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        handleNotification({
          active: true,
          error: true,
          message: "Message Not Sent!",
        });
      }
    }
  };

  return (
    <div className={styles.contactUsComponent}>
      <p className={styles.title}>Contact Us</p>
      <form className={styles.contactUsForm} onSubmit={fetchNewForm}>
        {/* names */}
        <div className={styles.namesContainer}>
          {/* firstName */}
          <div className={styles.firstNameContainer}>
            <div className={styles.asteriskContainer}>
              <p className={styles.inputName}>First Name</p>
              <p className={styles.asterisk}>*</p>
            </div>
            <input
              className={`${styles.inputField} ${
                formErrors.firstName?.length ? styles.inputFieldError : ""
              }`}
              type="text"
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
            />
            {formErrors.firstName &&
              formErrors.firstName.map((error, index) => (
                <p key={index} className={styles.errorText}>
                  {error}
                </p>
              ))}
          </div>
          {/* <---> */}

          {/* lastName */}
          <div className={styles.lastNameContainer}>
            <div className={styles.asteriskContainer}>
              <p className={styles.inputName}>Last Name</p>
              <p className={styles.asterisk}>*</p>
            </div>

            <input
              className={`${styles.inputField} ${
                formErrors.lastName?.length ? styles.inputFieldError : ""
              }`}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName &&
              formErrors.lastName.map((error, index) => (
                <p key={index} className={styles.errorText}>
                  {error}
                </p>
              ))}
          </div>
          {/* <---> */}
        </div>
        {/* <---> */}

        {/* email */}
        <div className={styles.emailContainer}>
          <div className={styles.asteriskContainer}>
            <p className={styles.inputName}>Email Address</p>
            <p className={styles.asterisk}>*</p>
          </div>
          <input
            className={`${styles.inputField} ${
              formErrors.email?.length ? styles.inputFieldError : ""
            }`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email &&
            formErrors.email.map((error, index) => (
              <p key={index} className={styles.errorText}>
                {error}
              </p>
            ))}
        </div>
        {/* <---> */}

        {/* queryType */}
        <div className={styles.queryContainer}>
          <div className={styles.asteriskContainer}>
            <p className={styles.inputName}>Query Type</p>
            <p className={styles.asterisk}>*</p>
          </div>
          {/* radioContainer */}
          <div className={styles.radioContainerMain}>
            {/* firstRadioBtn */}
            <div
              className={`${styles.radioContainer} ${
                selectedValue === "General Enquiry" &&
                styles.radioContainerSelected
              }`}
              onClick={() => handleRadioChange("General Enquiry")}
            >
              <input
                type="radio"
                name="enquiryType"
                value="General Enquiry"
                checked={selectedValue === "General Enquiry"}
                readOnly
                onChange={handleChange}
              />
              <div className={styles.rationIconContainer}>
                {selectedValue === "General Enquiry" ? (
                  <ActiveRadioButton className={styles.radioIcon} />
                ) : (
                  <InactiveRadioIcon className={styles.radioIcon} />
                )}
              </div>
              <p className={styles.radioLabel}>General Enquiry</p>
            </div>
            {/* <---> */}

            {/* secondRadioBtn */}
            <div
              className={`${styles.radioContainer} ${
                selectedValue === "Support Request" &&
                styles.radioContainerSelected
              }`}
              onClick={() => handleRadioChange("Support Request")}
            >
              <input
                type="radio"
                name="enquiryType"
                value="Support Request"
                checked={selectedValue === "Support Request"}
                readOnly
                onChange={handleChange}
              />
              <div className={styles.rationIconContainer}>
                {selectedValue === "Support Request" ? (
                  <ActiveRadioButton className={styles.radioIcon} />
                ) : (
                  <InactiveRadioIcon className={styles.radioIcon} />
                )}
              </div>
              <p className={styles.radioLabel}>Support Request</p>
            </div>
            {/* <---> */}
            {formErrors.queryType &&
              formErrors.queryType.map((error, index) => (
                <p key={index} className={styles.errorText}>
                  {error}
                </p>
              ))}
          </div>
          {/* <---> */}
        </div>

        {/* messageContainer */}
        <div className={styles.messageContainer}>
          <div className={styles.asteriskContainer}>
            <p className={styles.inputName}>Message</p>
            <p className={styles.asterisk}>*</p>
          </div>
          <textarea
            autoComplete="off"
            className={`${styles.inputMessageField} ${
              formErrors.message?.length ? styles.inputMessageFieldError : ""
            }`}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {formErrors.message &&
            formErrors.message.map((error, index) => (
              <p key={index} className={styles.errorText}>
                {error}
              </p>
            ))}
        </div>
        {/* <---> */}

        {/* checkboxContainer */}
        <div className={styles.checkboxContainer}>
          <div
            className={styles.asteriskContainer}
            onClick={() => {
              setIsChecked((prevState) => !prevState);
              setFormErrors((prevErrors) => ({ ...prevErrors, checkbox: [] }));
            }}
          >
            <input
              className={styles.checkboxInput}
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              readOnly
            />
            <div className={styles.checkboxIconContainer}>
              {isChecked ? <ActiveCheckBoxIcon /> : <CkeckBoxIcon />}
            </div>
            <p className={styles.checkboxText}>
              I consent to being contacted by the team
            </p>
            <p className={styles.asterisk}>*</p>
          </div>
          {formErrors.checkbox &&
            formErrors.checkbox.map((error, index) => (
              <p key={index} className={styles.errorText}>
                {error}
              </p>
            ))}
        </div>
        {/* <---> */}

        {/* submitBtn */}
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
        {/* <---> */}
      </form>
      {notification.active && <Notification notification={notification} />}
    </div>
  );
};
