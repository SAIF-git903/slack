import React, { useState } from "react";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import "./style.css";
import { ItemDropDownProps } from "../../../utils/types/type";
import { useNavigate } from "react-router-dom";

function ItemDropDown({ title, isPlus }: ItemDropDownProps) {
  const [caretRotation, setCaretRotation] = useState(0);
  const navigate = useNavigate();

  const handleCaretClick = () => {
    setCaretRotation(270);
  };

  const handlePlusClick = () => {
    navigate("/");
  };

  return (
    <div className="dropdown-top-container">
      <div className="dropdown-sub-container">
        <div className="centered caret-div" onClick={handleCaretClick}>
          <CaretDownOutlined
            style={{ fontSize: "12px" }}
            rotate={caretRotation}
          />
        </div>
        <div className="centered dropdown-text-div">
          <p style={{ fontSize: "15px" }}>{title}</p>
        </div>
      </div>
      {isPlus && (
        <div className="centered dropdown-plus-icon">
          <PlusOutlined onClick={handlePlusClick} />
        </div>
      )}
    </div>
  );
}

export default ItemDropDown;
