import React from "react";
import "./Header.scss";

const Header = ({greetingTime}) => {
  const dayTime = new Date().toDateString();
  return (
    <div className="header">
      <h3>{dayTime}</h3>
      <h3 className="header__greeting">Good {greetingTime}</h3>
    </div>
  );
};

export default Header;
