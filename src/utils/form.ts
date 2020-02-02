import { StatelessComponent } from "react";
import { AjvError, WidgetProps } from "react-jsonschema-form";

import PhoneNumberWidget from "components/PhoneNumberWidget";

interface Error {
  property: string;
  params: {
    format: string;
  };
}

interface Schema {
  properties: {
    [key: string]: {
      title: string;
    };
  };
}

interface Formats {
  [key: string]: {
    regex: RegExp;
    error: string;
  };
}

interface ErrorStrings {
  [key: string]: string;
}

const getFieldNameFromError = (error: Error, schema: Schema) =>
  schema.properties[error.property.substr(1)].title;

const getTransformErrors = (schema: Schema, formats: Formats) => (
  errors: Error[]
) => {
  const errorStrings = getErrorStrings(formats);

  return errors.map(error =>
    Object.keys(errorStrings).includes(error.params.format)
      ? {
          ...error,
          message: errorStrings[error.params.format],
          stack: `${getFieldNameFromError(error, schema)} ${
            errorStrings[error.params.format]
          }`
        }
      : error
  ) as AjvError[];
};

const formats: Formats = {
  phoneNumberFormat: {
    regex: /^$|^\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/,
    error: "must be valid and in the format of XXX-XXX-XXXX"
  },
  emailAddressFormat: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: "must be in the format of something@domain.tld"
  }
};

const getCustomFormats = (formats: Formats) =>
  Object.keys(formats).reduce(
    (customFormats, key) => ({
      ...customFormats,
      [key]: formats[key].regex
    }),
    {}
  );

type GetErrorStrings = (formats: Formats) => ErrorStrings;

const getErrorStrings: GetErrorStrings = formats =>
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

const widgets = {
  phoneNumberWidget: PhoneNumberWidget as StatelessComponent<WidgetProps>
};

export { getTransformErrors, formats, widgets, getCustomFormats };
