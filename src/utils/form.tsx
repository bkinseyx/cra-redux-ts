import React from "react";
// import { UiSchema } from "react-jsonschema-form";
// import { JSONSchema6, JSONSchema6Type } from 'json-schema';
import InputMask from "react-input-mask";

const getFieldNameFromError = (error: any, schema: any) =>
  schema.properties[error.property.substr(1)].title;

const getTransformErrors = (schema: any, formats: any) => (errors: any) => {
  const errorStrings: any = getErrorStrings(formats);

  return errors.map((error: any) =>
    Object.keys(errorStrings).includes(error.params.format)
      ? {
          ...error,
          message: errorStrings[error.params.format],
          stack: `${getFieldNameFromError(error, schema)} ${
            errorStrings[error.params.format]
          }`
        }
      : error
  );
};

const formats = {
  phoneNumberFormat: {
    regex: /^$|^\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/,
    error: "must be valid and in the format of XXX-XXX-XXXX"
  },
  emailAddressFormat: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: "must be in the format of something@domain.tld"
  }
};

const getCustomFormats = (formats: any) =>
  Object.keys(formats).reduce(
    (customFormats, key) => ({
      ...customFormats,
      [key]: formats[key].regex
    }),
    {}
  );

const getErrorStrings = (formats: any) =>
  Object.keys(formats).reduce(
    (customFormats, key) => ({
      ...customFormats,
      [key]: formats[key].error
    }),
    {}
  );

// It is necessary to make sure value is initialized as a string, rather than undefined.
// Because otherwise react will give a warning about an uncontrolled component changing
// to a controlled component.
const PhoneNumberWidget = (props: any) => {
  const { value = "", required, onChange } = props;
  return (
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
};
const widgets = {
  phoneNumberWidget: PhoneNumberWidget
};

export { getTransformErrors, formats, widgets, getCustomFormats };
