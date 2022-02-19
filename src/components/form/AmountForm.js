import { Box, Typography, FormLabel, Switch as MaterialSwitch, FormControlLabel } from '@mui/material'
import { useField } from 'formik'
import React, { useState } from 'react'

import { InputField as Field } from './fields/input'
import { SelectField as Select } from './fields/select'
import useGetETHtoUSD from '../../hooks/useGetETHtoUSD'

function ETHInput(props) {
    const [field, meta] = useField(props);
    const USD = useGetETHtoUSD(field.value ? field.value : 0)
    return (
      <>
        <Field {...field} {...props} />
        {meta.error && meta.touched && <div>{meta.error}</div>}
        <FormLabel label="Amount in USD"/>
        <Typography variant="h5" component="h5" style={{color: 'white'}}>
            ${USD}
        </Typography>
      </>
    );
  }

export const AmountForm = ({ formField, formProps }) => {
    //   const [field, meta] = useField(formProps)
    const [beneficiaryVis, setBeneficiaryVis] = useState(false);
  const {termInYears, ethAmount, trusteeAddress, beneficiaryAddress, retainedInterest, graduatedToggle, beneficiaryToggle, interestRate, firstPayment } = formField
  const updateBeneficiaryToggle = () => {
      setBeneficiaryVis(!beneficiaryVis)

  }
  return (
    <>
        <Box
          sx={{
            width: '100%',
            // height: '25rem',
            marginBottom: '.5rem',
            borderRadius: '1rem',
            display: 'flex',
          }}
        >
            <Box
              sx={{
                '& > :not(style)': {
                  m: 3,
                  pb: 5.0,
                  width: '18rem',
                  padding: '.2rem',
                },
              }}
              autoComplete="off"
            >
                <ETHInput 
                    name={ethAmount.name}
                    label={ethAmount.label}
                    placeholder={ethAmount.placeholder}
                />
                <Field 
                    name={termInYears.name}
                    label={termInYears.label}
                    placeholder={termInYears.placeholder}
                />
                <Field 
                    name={trusteeAddress.name}
                    label={trusteeAddress.label}
                    placeholder={trusteeAddress.placeholder}
                />
                <Field 
                    name={beneficiaryAddress.name}
                    label={beneficiaryAddress.label}
                    placeholder={beneficiaryAddress.placeholder}
                />
                <Field 
                    name={retainedInterest.name}
                    label={retainedInterest.label}
                    placeholder={retainedInterest.placeholder}
                />
                <div>
                <label className='switch'>
                    <Field type="checkbox" name={beneficiaryToggle.name} label={beneficiaryToggle.label} />
                    <span className="slider round"></span>
                    {`${beneficiaryToggle.toggle}`}
                </label>
                {/* <label className="switch">
                    <input type="checkbox" onChange={e => setBeneficiaryToggle(!beneficiaryToggle)}/>
                    <span className="slider round"></span>
                </label> */}
                </div>
                <Field 
                    name={graduatedToggle.name}
                    label={graduatedToggle.label}
                    placeholder={graduatedToggle.placeholder}
                />
                <Field 
                    name={graduatedToggle.name}
                    label={graduatedToggle.label}
                    placeholder={graduatedToggle.placeholder}
                />

                  {/* {Object.values(formField).map((field, index) => (
                    <Field
                        key={index}
                        size={''}
                        name={field.name}
                        placeholder={field.label}
                        label={field.label}
                        // meta={meta}
                    />
                  ))} */}
                  {/* <Select 
                    size={''}
                    name={termInYears.name}
                    placeholder={termInYears.label}
                    label={termInYears.label}
                  /> */}
            </Box>
          </Box>
    </>
  )
}
