/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";

const FormInput = ({
  label,
  onChange,
  errorMessage,
  handleSetFocused,
  ...otherProps
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="inputField">
      <label>{label}</label>
      <input
        {...otherProps}
        onChange={onChange}
        onBlur={() => setFocused(true)}
        onFocus={() =>
          otherProps.name === "konfirmasiPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>
        <p>{errorMessage}</p>
      </span>
    </div>
  );
};

export default FormInput;
