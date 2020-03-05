import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import PropTypes from "prop-types";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        onClick={(): {} => dispatch(clearForm())}
      >
        Clear
      </button>
    </div>
  );
};
FormButtonBar.propTypes = {
  sliceKey: PropTypes.string.isRequired,
  clearForm: PropTypes.any.isRequired
};

export default FormButtonBar;
