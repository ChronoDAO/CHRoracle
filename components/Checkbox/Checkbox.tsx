"use client";
import React, { useState } from "react";

const YesNoCheckbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState({
    yes: false,
    no: false,
  });

  const handleCheckboxChange = (type: "yes" | "no") => {
    setIsChecked({
      yes: type === "yes",
      no: type === "no",
    });
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked.yes}
          onChange={() => handleCheckboxChange("yes")}
        />
        Yes
      </label>
      <label>
        <input
          type="checkbox"
          checked={isChecked.no}
          onChange={() => handleCheckboxChange("no")}
        />
        No
      </label>
    </div>
  );
};

export default YesNoCheckbox;
