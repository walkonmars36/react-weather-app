import React from "react";
import "./Header.scss";

const Header = () => {
  const currentHour = new Date().getHours();
  let greetingImg = "";
  let greetingTime = "Morning";

  if (currentHour >= 12) {
    greetingImg = "";
    greetingTime = "Afternoon";
  }

  if (currentHour >= 18) {
    greetingImg = "";
    greetingTime = "Evening";
  }

  const dayTime = new Date().toDateString();
  return (
    <div>
      <h3>{dayTime}</h3>
      <h3>Good {greetingTime}</h3>
    </div>
  );
};

export default Header;