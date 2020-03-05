import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { RootState } from "rootReducer";

interface FormAlertBarProps {
  sliceKey: string;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const FormAlertBar: React.FC<FormAlertBarProps> = ({ sliceKey }) => {
  const { serverSuccessMessage, serverError, submitting } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
FormAlertBar.propTypes = {
  sliceKey: PropTypes.string.isRequired
};

export default FormAlertBar;
