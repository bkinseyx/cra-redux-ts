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
  submitDemoForm,
  clearForm
} from "features/demoForm/demoFormSlice";

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
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary"
            type="reset"
            onClick={() => dispatch(clearForm())}
          >
            Clear
          </button>
        </div>
      </Form>
    </div>
  );
};

export default DemoForm;
