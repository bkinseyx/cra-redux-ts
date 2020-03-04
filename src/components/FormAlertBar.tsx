import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "rootReducer";

interface FormAlertBarProps {
  sliceKey: string;
}

const FormAlertBar: React.FC<FormAlertBarProps> = ({ sliceKey }) => {
  const { serverSuccessMessage, serverError, submitting } = useSelector(
    (state: RootState) => (state as any)[sliceKey]
  );

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default FormAlertBar;
