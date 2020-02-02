import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

import { RootState } from "rootReducer";

interface FormButtonBarProps {
  sliceKey: string;
  clearForm: ActionCreatorWithoutPayload;
}

const FormButtonBar: React.FC<FormButtonBarProps> = ({
  sliceKey,
  clearForm
}) => {
  const dispatch = useDispatch();
  const { submitting } = useSelector(
    (state: RootState) => (state as any)[sliceKey]
  );

  return (
    <div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
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
  );
};

export default FormButtonBar;
