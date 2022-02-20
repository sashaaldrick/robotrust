import { Box, Typography, Divider, Switch, FormLabel, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'
import { Field as Checkbox } from 'formik'
import { InputField as Field } from './fields/input'
import { SelectField as Select } from './fields/select'
import { ETHInput } from './fields/ETHInput'
import useCalculateFirstPayment from '../../hooks/useCalculateFirstPayment'

export const AmountForm = ({ formField, formProps }) => {
    const {termInYears, ethAmount, trusteeAddress, beneficiaryAddress, retainedInterest, graduatedToggle, beneficiaryToggle, graduatedPercentage } = formField
    const [toggleBeneficiary, setToggleBeneficiary] = useState(false)
    const [toggleGraduated, setToggleGraduated] = useState(false);
    const handleToggleBeneficiary = (event) => {
        setToggleBeneficiary(event.target.checked)
    };

    const handleToggleGraduated = (event) => {
        setToggleGraduated(event.target.checked)
    };

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
                <Typography variant="h3" className="gradient__text">Enter GRAT Provisions</Typography>
                <Divider />
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '45%',
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
                        width: '45%'
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
                        width: '45%',
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
                        width: '45%'
                    }}>
                        <Field 
                            name={termInYears.name}
                            label={termInYears.label}
                            placeholder={termInYears.placeholder}
                        />
                        <Typography style={{color: '#FF8A71'}}>Warning: Setting this value lower than ‘2’ may result in nonrecognition by the IRS.</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                <FormLabel style={{ fontSize: '1.5rem' }} className="gradient__text">Interest Rate</FormLabel>
                <Typography style={{color: '#FF8A71', fontSize: "1.5rem" }}>1.6%</Typography>
                    </Box>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '45%'}}>
                     <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        </Box>  
                        <Box sx={{
                                display: 'flex'
                            }}>
                                {/* <label className="switch">
                                    <input type="checkbox" onChange={e => setToggleGraduated(!graduatedToggle)} />
                                    <span className="slider round"></span>
                                </label> */}
                            <FormLabel style={{ fontSize: '1.5rem' }} className="gradient__text">Allow Beneficiary to view accounting?</FormLabel>    
                             <Switch color="secondary" size='h2' name={beneficiaryToggle.name} label={beneficiaryToggle.label} onChange={handleToggleBeneficiary} checked={toggleBeneficiary} value={toggleBeneficiary} inputProps={{ 'aria-label': 'uncontrolled' }} />            
                        </Box> 
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <FormLabel style={{ fontSize: '1.5rem' }} className="gradient__text">Increasing Annuity Payments?</FormLabel>
                        <Switch color="secondary" size='h2' name={graduatedToggle.name} label={graduatedToggle.label} onChange={handleToggleGraduated} checked={toggleGraduated} value={toggleGraduated} inputProps={{ 'aria-label': 'uncontrolled' }} />
                    </Box>
                    { toggleGraduated 
                        ? 
                        <Box>
                        <Field 
                            name={graduatedPercentage.name}
                            label={graduatedPercentage.label}
                            placeholder={graduatedPercentage.placeholder}
                        />
                         <Typography style={{color: '#FF8A71'}}> Warning: Setting the graduation rate higher than 20% may result in nonrecognition by the IRS. </Typography> 
                        </Box>
                        : ''
                    }
                </Box>
                </Box>
            </Box>
          </Box>
    </>
  )
}
