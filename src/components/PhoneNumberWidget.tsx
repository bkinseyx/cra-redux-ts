import React from "react";
import InputMask from "react-input-mask";

interface PhoneNumberWidgetProps {
  value: string;
  required: boolean | undefined;
  onChange: (value: string) => void;
}

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
