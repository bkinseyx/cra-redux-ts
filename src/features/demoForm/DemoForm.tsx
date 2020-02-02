import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-jsonschema-form";
import { JSONSchema6 } from "json-schema";

import { RootState } from "rootReducer";
import {
  widgets,
  getCustomFormats,
  formats,
  getTransformErrors
} from "../../utils/form";
import {
  formDataChange,
  submitDemoForm
} from "features/demoForm/demoFormSlice";
import FormButtonBar from "./FormButtonBar";
import schema from "./demoFormSchema.json";
import uiSchema from "./demoFormUiSchema.json";

const DemoForm: React.FC = () => {
  const dispatch = useDispatch();
  const {
    formKey,
    formData,
    serverSuccessMessage,
    serverError,
    submitting
  } = useSelector((state: RootState) => state.demoForm);

  return (
    <div className="DemoForm">
      <h1>Demo Form</h1>
      {serverSuccessMessage && (
        <div className="alert alert-success" role="alert">
          {serverSuccessMessage}
        </div>
      )}
      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
        </div>
      )}
      {submitting && (
        <div className="alert alert-info" role="alert">
          Submitting...
        </div>
      )}
      <Form
        key={formKey}
        schema={schema as JSONSchema6}
        uiSchema={uiSchema}
        widgets={widgets}
        customFormats={getCustomFormats(formats)}
        transformErrors={getTransformErrors(schema, formats)}
        formData={formData}
        onChange={({ formData }) => dispatch(formDataChange(formData))}
        onSubmit={({ formData }) => dispatch(submitDemoForm(formData))}
      >
        <FormButtonBar></FormButtonBar>
      </Form>
    </div>
  );
};

export default DemoForm;
