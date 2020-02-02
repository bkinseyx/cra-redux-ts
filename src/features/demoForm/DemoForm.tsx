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
import FormAlertBar from "components/FormAlertBar";
import FormButtonBar from "components/FormButtonBar";
import schema from "./demoFormSchema.json";
import uiSchema from "./demoFormUiSchema.json";

const DemoForm: React.FC = () => {
  const dispatch = useDispatch();
  const { formKey, formData } = useSelector(
    (state: RootState) => state.demoForm
  );

  return (
    <div className="DemoForm">
      <h1>Demo Form</h1>
      <FormAlertBar sliceKey="demoForm"></FormAlertBar>
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
        <FormButtonBar
          sliceKey="demoForm"
          clearForm={clearForm}
        ></FormButtonBar>
      </Form>
    </div>
  );
};

export default DemoForm;
