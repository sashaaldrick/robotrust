import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import React, { useState, createContext } from "react";
import deployTrust from "../../utils/deployTrust";
import useSetGRAT from "../../hooks/useSetGRAT";
import SigningForm from './SigningForm'


import { AmountForm } from "./AmountForm";

import initialValues from "./helpers/formInitialValues";
import GRATFormModel from "./helpers/GRATFormModel";

export const FormContext = createContext("");

const steps = ["amount form", "signing form", "data display"];
const { formId, formField } = GRATFormModel;

function _renderStepContent(step, formProps, values, trustData) {
  switch (step) {
    case 0:
      return <AmountForm formField={formField} formProps={formProps} />;
    case 1:
      return <SigningForm />;
    case 2: 
      return <DataDisplay data={trustData}/>
    default:
      return <AmountForm formField={formField} formProps={formProps} />;
  }
}

const GRATPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [GRAT, setGRAT] = useSetGRAT();
  var trustData;
//   const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  async function _handleSubmit(values, actions) {
    if (activeStep[0]) {
      setGRAT(values);
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    } else if (activeStep[1]) {
      actions.setTouched({});
      trustData = await deployTrust(values);
      setActiveStep(activeStep + 1);
      actions.setSubmitting(true);
    } else if (activeStep[2]) {

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
                <Box className="" sx={{
                    margin: '4rem',
                }}>
                  {_renderStepContent(activeStep, FormProps, GRAT, trustData)}
                </Box>
                <Box sx={{
                  marginY: '4rem',
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
                      I Understand and Agree
                    </Button>
                  ) : (
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
                  )}
                </Box>
              </Form>
          )}
        </Formik>
      </Box>
  );
};

export default GRATPage;
