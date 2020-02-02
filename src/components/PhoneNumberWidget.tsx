import React from "react";
import InputMask from "react-input-mask";

interface PhoneNumberWidgetProps {
  value: string;
  required: boolean | undefined;
  onChange: (value: string) => void;
}

// It is necessary to make sure value is initialized as a string, rather than undefined.
// Because otherwise react will give a warning about an uncontrolled component changing
// to a controlled component.
const PhoneNumberWidget: React.FC<PhoneNumberWidgetProps> = ({
  value = "",
  required,
  onChange
}) => (
  <InputMask
    mask="999-999-9999"
    maskChar="_"
    type="tel"
    className="form-control"
    value={value}
    required={required}
    onChange={event => onChange(event.target.value)}
  />
);

export default PhoneNumberWidget;
