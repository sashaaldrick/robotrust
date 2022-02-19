import { Box, Typography, Divider, Switch } from '@mui/material'
import React, { useState } from 'react'

import { InputField as Field } from './fields/input'
import { SelectField as Select } from './fields/select'
import { ETHInput } from './fields/ETHInput'

export const AmountForm = ({ formField, formProps }) => {
  const {termInYears, ethAmount, trusteeAddress, beneficiaryAddress, retainedInterest, graduatedToggle, beneficiaryToggle, interestRate, firstPayment } = formField

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
                //   width: '18rem',
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
                <Typography variant="h3" className="gradient__text">Enter GRAT provisions:</Typography>
                <Divider />
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '40%',
                    }}>
                        <Field 
                            name={trusteeAddress.name}
                            label={trusteeAddress.label}
                            placeholder={trusteeAddress.placeholder}
                        />
                        <Typography style={{color: '#FF8A71'}}>The Trustee has the ability to liquidate the Trust, 
                            in which case all assets of the Trust will be transferred to 
                            the then current Trustee Wallet. The Trustee also has the ability 
                            to assign Trustee control to another wallet.
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '40%'
                    }}>
                        <Field 
                            name={beneficiaryAddress.name}
                            label={beneficiaryAddress.label}
                            placeholder={beneficiaryAddress.placeholder}
                        />
                    </Box>
                </Box>
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '40%',
                    }}>
                        <Field 
                            name={retainedInterest.name}
                            label={retainedInterest.label}
                            placeholder={retainedInterest.placeholder}
                        />
                        <Typography style={{color: '#FF8A71'}}>The estimated gift includable in your estate is equal to the grant amount minus the retained interest.</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '40%'
                    }}>
                        <Field 
                            name={termInYears.name}
                            label={termInYears.label}
                            placeholder={termInYears.placeholder}
                        />
                        <Typography style={{color: '#FF8A71'}}>Warning: Setting this value lower than ‘2’ may result in nonrecognition by the IRS.</Typography>
                    </Box>
                </Box>
                <Typography style={{color: '#FF8A71'}}>Interest Rate: 1.69%</Typography>
                <Switch color="secondary" name={beneficiaryToggle.name} label={beneficiaryToggle.label} />
            </Box>
          </Box>
    </>
  )
}
