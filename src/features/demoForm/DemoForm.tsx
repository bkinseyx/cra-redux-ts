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
  clearServerError
} from "features/demoForm/demoFormSlice";

import schema from "./demoFormSchema.json";
import uiSchema from "./demoFormUiSchema.json";

const DemoForm: React.FC = () => {
  const dispatch = useDispatch();
  const { formData, serverError, submitting } = useSelector(
    (state: RootState) => state.demoForm
  );

  return (
    <div className="DemoForm">
      DemoForm
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <Form
        schema={schema as JSONSchema6}
        uiSchema={uiSchema}
        widgets={widgets}
        customFormats={getCustomFormats(formats)}
        transformErrors={getTransformErrors(schema, formats)}
        formData={formData}
        onChange={({ formData }) => dispatch(formDataChange(formData))}
        onSubmit={({ formData }) => dispatch(submitDemoForm(formData))}
        onError={clearServerError}
      >
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default DemoForm;
