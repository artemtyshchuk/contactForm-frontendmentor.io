import styles from "./ContactUsComponent.module.scss";
import { ReactComponent as CkeckBoxIcon } from "assets/images/CheckboxIcon.svg";
import { ReactComponent as ActiveCheckBoxIcon } from "assets/images/icon-checkbox-check.svg";
import { ReactComponent as ActiveRadioButton } from "assets/images/icon-radio-selected.svg";
import { ReactComponent as InactiveRadioIcon } from "assets/images/RadioIcon.svg";
import { useState } from "react";

interface ContactUsComponentProps {}

export const ContactUsComponent = ({}: ContactUsComponentProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className={styles.contactUsComponent}>
      <p className={styles.title}>Contact Us</p>
      <form className={styles.contactUsForm}>
        <div className={styles.namesContainer}>
          <div className={styles.firstNameContainer}>
            <div className={styles.asteriskContainer}>
              <p className={styles.inputName}>First Name</p>
              <p className={styles.asterisk}>*</p>
            </div>
            <input className={styles.inputField} type="text" name="firstName" required />
          </div>

          <div className={styles.lastNameContainer}>
            <div className={styles.asteriskContainer}>
              <p className={styles.inputName}>Last Name</p>
              <p className={styles.asterisk}>*</p>
            </div>

            <input className={styles.inputField} type="text" name="lastName" required />
          </div>
        </div>

        <div className={styles.emailContainer}>
          <div className={styles.asteriskContainer}>
            <p className={styles.inputName}>Email Address</p>
            <p className={styles.asterisk}>*</p>
          </div>
          <input className={styles.inputField} type="email" name="email" required />
        </div>

        <div className={styles.queryContainer}>
          <div className={styles.asteriskContainer}>
            <p className={styles.inputName}>Query Type</p>
            <p className={styles.asterisk}>*</p>
          </div>

          <div className={styles.radioContainerMain}>
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
                required
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
                required
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
          </div>
        </div>

        <div className={styles.messageContainer}>
          <div className={styles.asteriskContainer}>
            <p className={styles.inputName}>Message</p>
            <p className={styles.asterisk}>*</p>
          </div>
          <textarea
            autoComplete="off"
            className={styles.inputMessageField}
            name="message"
            required
          />
        </div>

        <div className={styles.checkboxContainer}>
          <div
            className={styles.asteriskContainer}
            onClick={() => setIsChecked((prevState) => !prevState)}
          >
            <input
              className={styles.checkboxInput}
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              required
            />
            <div className={styles.checkboxIconContainer}>

            {isChecked ? <ActiveCheckBoxIcon /> : <CkeckBoxIcon />}
            </div>
            <p className={styles.checkboxText}>
              I consent to being contacted by the team
            </p>
            <p className={styles.asterisk}>*</p>
          </div>
        </div>

        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
