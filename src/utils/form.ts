import { StatelessComponent } from "react";
import { AjvError, WidgetProps } from "react-jsonschema-form";
import { JSONSchema6 } from "json-schema";

import PhoneNumberWidget from "components/PhoneNumberWidget";

/** field title is the plain english name (with space chars). */
const getFieldTitleFromError = (error: AjvError, schema: JSONSchema6) => {
  // for some reason error properties are prepended with a . so we strip 'em off
  const propertyFromError = error.property.substr(1);

  // "as any" necessary here because JSONSchema6 can define non-string properties for some reason that eludes me
  // in our case we are fine here since we know all our properties must be strings
  return (schema.properties as any)[propertyFromError].title;
};

/** given errors, generate user friendly error messages in a way that react-jsonschema-form expects */
const getTransformErrors = (schema: JSONSchema6, formats: Formats) => (
  errors: AjvError[]
) => {
  const errorStrings = getErrorStrings(formats);
  return errors.map(error =>
    Object.keys(errorStrings).includes(error.params.format)
      ? {
          ...error,
          message: errorStrings[error.params.format],
          stack: `${getFieldTitleFromError(error, schema)} ${
            errorStrings[error.params.format]
          }`
        }
      : error
  );
};

interface Formats {
  [key: string]: {
    regex: RegExp;
    error: string;
  };
}

/**
 * I think it would be best to define formats directly with the error message.
 * This isn't built into react-jsonschema-format, so I will do it myself.
 */
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

/** react-jsonschema-form expects formats like [key]: regex */
const getCustomFormats = (formats: Formats) =>
  Object.keys(formats).reduce(
    (customFormats, key) => ({
      ...customFormats,
      [key]: formats[key].regex
    }),
    {}
  );

interface ErrorStrings {
  [key: string]: string;
}

type GetErrorStrings = (formats: Formats) => ErrorStrings;

/** transforms errors from format like [key]: regex */
const getErrorStrings: GetErrorStrings = formats =>
  Object.keys(formats).reduce(
    (customFormats, key) => ({
      ...customFormats,
      [key]: formats[key].error
    }),
    {}
  );

/** extended components used by react-jsonschema-forms */
const widgets = {
  phoneNumberWidget: PhoneNumberWidget as StatelessComponent<WidgetProps>
};

export { getTransformErrors, formats, widgets, getCustomFormats };
