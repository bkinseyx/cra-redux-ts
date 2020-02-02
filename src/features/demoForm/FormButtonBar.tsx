import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "rootReducer";
import { clearForm } from "features/demoForm/demoFormSlice";

const FormButtonBar: React.FC = () => {
  const dispatch = useDispatch();
  const { submitting } = useSelector((state: RootState) => state.demoForm);

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
