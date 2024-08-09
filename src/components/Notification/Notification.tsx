import { useState } from "react";
import styles from "./Notification.module.scss";
import { createPortal } from "react-dom";
import { NotificationType } from "types"; // Предположим, что это определено корректно
import { motion } from "framer-motion";
import { ReactComponent as CheckIcon } from "assets/images/CheckIcon.svg";
import { ReactComponent as ErrorCheckIcon } from "assets/images/icons8-error.svg";

interface NotificationProps {
  notification: NotificationType;
}

export const Notification = ({ notification }: NotificationProps) => {
  const animation = {
    hidden: {
      y: -300,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -300,
      opacity: 0,
    },
  };

  return createPortal(
    notification.active && (
      <motion.div
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
        transition={{
          delay: 0.5,
        }}
        variants={animation}
        className={`${styles.notification} ${
          notification.error ? styles.notificationError : ""
        }`}
      >
        {notification.error ? (
          <>
            <div className={styles.notificationTitleContainer}>
              <ErrorCheckIcon className={styles.notificationErrorIcon} />
              <p className={styles.notificationTitle}>{notification.message}</p>
            </div>
            <p className={styles.notificationText}>Please try again later</p>
          </>
        ) : (
          <>
            <div className={styles.notificationTitleContainer}>
              <CheckIcon />
              <p className={styles.notificationTitle}>{notification.message}</p>
            </div>
            <p className={styles.notificationText}>
              Thanks for completing the form. We’ll be in touch soon!
            </p>
          </>
        )}
      </motion.div>
    ),
    document.getElementById("notification") as HTMLElement
  );
};
