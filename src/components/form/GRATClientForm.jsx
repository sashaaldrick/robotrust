import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import React, { useState, createContext, useEffect } from "react";
import useDeployTrust from "../../hooks/useDeployTrust";
import useSetGRAT from "../../hooks/useSetGRAT";

import { AmountForm } from "./AmountForm";

import initialValues from "./helpers/formInitialValues";
import GRATFormModel from "./helpers/GRATFormModel";
// import validationSchema from "src/utils/forms/validationSchema";

export const FormContext = createContext("");

const steps = ["amount form"];
const { formId, formField } = GRATFormModel;

function _renderStepContent(step, formProps) {
  switch (step) {
    case 0:
      return <AmountForm formField={formField} formProps={formProps} />;
    default:
      return <AmountForm formField={formField} formProps={formProps} />;
  }
}

const GRATPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [GRAT, setGRAT] = useSetGRAT();
//   const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  function _handleSubmit(values, actions) {
    if (!isLastStep) {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      setGRAT(values);
    }
  }
  useDeployTrust()
  return (
      <Box sx={{ p: 1, m: 1 }} className="client">
        <Formik
          initialValues={initialValues}
          // validationSchema={currentValidationSchema}
          onSubmit={_handleSubmit}
        >
          {(FormProps) => (
              <Form
                id={formId}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box className="">
                  {_renderStepContent(activeStep, FormProps)}
                </Box>
                <div className="mt-4 flex justify-end">
                  {isLastStep ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="inherit"
                      sx={{
                        width: "25rem",
                        backgroundColor: "darkslateblue",
                        fontSize: "1.1rem",
                      }}
                    >
                      Generate Signing Document
                    </Button>
                  ) : (
                    <React.Fragment />
                  )}
                </div>
              </Form>
          )}
        </Formik>
      </Box>
  );
};

export default GRATPage;
