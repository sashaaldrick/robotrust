import { Box, Typography, FormLabel } from '@mui/material'
import { useField } from 'formik'
import React from 'react'
import useGetETHtoUSD from '../../../hooks/useGetETHtoUSD'
import { InputField as Field } from './input'


export function ETHInput(props) {
    const [field, meta] = useField(props);
    const USD = useGetETHtoUSD(field.value ? field.value : 0)
    return (
      <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginX: '0',
      }}>
        <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '45%'
        }}>
            <Field {...field} {...props} />
            {meta.error && meta.touched && <div>{meta.error}</div>}
            <Box>
                <Typography style={{color: '#FF8A71'}}> 
                    The ETH/USD value is an estimate. Due to slippage, the value of your contribution may differ at the time the contract is signed.
                </Typography>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '45%'
            }}>
                <FormLabel label="Amount in USD" style={{color: '#FF8A71', fontSize: '1.5rem'}} className="gradient__text">Value in USD</FormLabel>
                <Typography variant="h5" component="h5" style={{color: '#FF8A71', marginTop: '1rem'}}>
                    ${USD}
                </Typography>
        </Box>
      </Box>
    );
  }