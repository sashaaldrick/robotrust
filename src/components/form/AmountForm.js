import { Box, Typography, Divider, Switch, FormLabel } from '@mui/material'
import React from 'react'

import { InputField as Field } from './fields/input'
import { SelectField as Select } from './fields/select'
import { ETHInput } from './fields/ETHInput'
import useCalculateFirstPayment from '../../hooks/useCalculateFirstPayment'

export const AmountForm = ({ formField, formProps }) => {
  const {termInYears, ethAmount, trusteeAddress, beneficiaryAddress, retainedInterest, graduatedToggle, beneficiaryToggle, interestRate, firstPayment } = formField
    const [firstPaymentVar] = useCalculateFirstPayment(retainedInterest, interestRate, 20, termInYears)
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
                <Typography style={{color: '#FF8A71'}}>1.6%</Typography>
                    </Box>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '45%'}}>
                            <Box sx={{
                                display: 'flex'
                            }}>
                                <Switch color="secondary" size='h2' name={graduatedToggle.name} label={graduatedToggle.label} />
                    <FormLabel style={{ fontSize: '1.5rem' }} className="gradient__text">Increasing Annuity Payments?</FormLabel>
                    
                        </Box>  
                        <Box sx={{
                                display: 'flex'
                            }}>    
                             <Switch color="secondary" size='h2' name={beneficiaryToggle.name} label={beneficiaryToggle.label} />            
                    <FormLabel style={{ fontSize: '1.5rem' }} className="gradient__text">Allow Beneficiary to view accounting?</FormLabel>
                   
                        </Box> 
                </Box>
                </Box>
                <div className="table">
                    <table className="styled-table">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Annuity in U.S. Dollars</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>01/02/2023</td>
                        <td>{firstPaymentVar}</td>
                        </tr>
                    <tr className="active-row">
                        <td>01/02/2024</td>
                        <td>$5150</td>
                    </tr>
                    </tbody>
                    </table>
                </div>
            </Box>
          </Box>
    </>
  )
}
