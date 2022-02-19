import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import React, { useState, createContext, useEffect } from "react";
import deployTrust from "../../utils/deployTrust";
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
      deployTrust(values);
    }
    
  }
  return (
      <Box sx={{ p: 1, mx: 3, my: 1 }} className="client">
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
                <Box sx={{
                  marginBottom: '4rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {isLastStep ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="inherit"
                      sx={{
                        width: "25rem",
                        backgroundColor: "darksalmon",
                        fontSize: "1.1rem",
                      }}
                    >
                      Generate Signing Document
                    </Button>
                  ) : (
                    <React.Fragment />
                  )}
                </Box>
              </Form>
          )}
        </Formik>
      </Box>
  );
};

export default GRATPage;
