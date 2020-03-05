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

import jsonSchema from "./demoFormSchema.json";
import uiSchema from "./demoFormUiSchema.json";

// I don't know how to directly type raw imported json from a file, so it is a second step
const schema = jsonSchema as JSONSchema6;

/** a form to demo react-jsonschema-form */
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
        // key only seems to be necessary in order to clear the form
        // see https://github.com/rjsf-team/react-jsonschema-form/issues/953#issuecomment-397815654
        key={formKey}
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        customFormats={getCustomFormats(formats)}
        transformErrors={getTransformErrors(schema, formats)}
        formData={formData}
        onChange={({ formData }): {} => dispatch(formDataChange(formData))}
        onSubmit={({ formData }): {} => dispatch(submitDemoForm(formData))}
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
