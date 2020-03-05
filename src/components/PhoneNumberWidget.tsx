import React from "react";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";

interface PhoneNumberWidgetProps {
  value: string;
  required: boolean | undefined;
  onChange: (value: string) => void;
}

/**
 * This widget is an custom field component that can be used inside of react-jsonschema-forms
 * The props are fed in from react-jsonschema-forms.
 * It is necessary to make sure value is initialized as a string, rather than undefined.
 * Because otherwise react will give a warning about an uncontrolled component changing
 * to a controlled component. I also like input masking.
 */
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
    onChange={(event): void => onChange(event.target.value)}
  />
);
PhoneNumberWidget.propTypes = {
  value: PropTypes.string.isRequired,
  required: PropTypes.any,
  onChange: PropTypes.any
};

export default PhoneNumberWidget;
