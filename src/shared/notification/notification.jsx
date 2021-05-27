import React from "react";
import Notification from "rc-notification";

let notification = null;
// eslint-disable-next-line no-return-assign
Notification.newInstance({ style: { top: 65 } }, (n) => (notification = n));

const showNotification = (theme, direction, title, message, color) => {
  const notificationInitialProps = {
    content: (
      <BasicNotification
        color={color}
        title={title}
        message={message}
        theme={theme}
      />
    ),
    closable: true,
    duration: 5,
    style: { top: 0, left: "calc(100vw - 100%)" },
    className: `right-up ${direction}-support`,
  };
  notification.notice(notificationInitialProps);
};

const BasicNotification = ({ color, title, message, theme }) => (
  <div
    className={`notification notification--${color} notification--${theme.className}`}
  >
    <h5 className="notification__title bold-text">{title}</h5>
    <p className="notification__message">{message}</p>
  </div>
);

const ImageNotification = ({ img, title, message, theme }) => (
  <div
    className={`notification notification--image notification--${theme.className}`}
  >
    <div className="notification__image">
      <img src={img} alt="" />
    </div>
    <h5 className="notification__title bold-text">{title}</h5>
    <p className="notification__message">{message}</p>
  </div>
);

const FullWideNotification = ({ color, message }) => (
  <div
    className={`notification notification--full-wide notification--${color}`}
  >
    <p className="notification__message">{message}</p>
  </div>
);

export {
  BasicNotification,
  ImageNotification,
  FullWideNotification,
  showNotification,
};
