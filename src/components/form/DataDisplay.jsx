import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import useCalculateFirstPayment from '../../hooks/useCalculateFirstPayment'
import { ethers } from 'ethers';

const DataDisplay = (trustData) => {
  console.log("trustData: " + JSON.stringify(trustData));

  let arrayOfTuples = [];

  for (const [key, value] of Object.entries(trustData.data)) {
    console.log(`${key}: ${value}`);
    arrayOfTuples.push([key.toString(), value.toString()]);
  };

  let testArray = [];
  trustData.data.paymentAmounts.map((payment) => 
  testArray.push(+(ethers.utils.formatUnits(payment.toString(), 18))));

  let initialEthAmount = ethers.utils.formatUnits(trustData.data.initialGrant[0].ethPaid.toString(), 18);

  let initialEthPrice = ethers.utils.formatUnits(trustData.data.initialGrant[0].ethPrice.toString(), 8);

  let trustAddress = trustData.data.trustAddress;

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
                  <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                      <Typography variant="h4" sx={{color: '#FF8A71'}}>Trust: {trustAddress}</Typography>
                  </Box>
                <Divider />
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    </Box>
                </Box>
                <div className="table">
                        <table className="styled-table">
                        <thead>
                            <tr>
                            <th> </th>
                            <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> Owner: </td>
                            <td> {trustData.data.owner.toString()} </td>
                          </tr>
                          <tr>
                            <td> Trustee: </td>
                            <td> {trustData.data.trustee.toString()} </td>
                          </tr>
                          <tr>
                            <td> Beneficiary: </td>
                            <td> {trustData.data.beneficiary.toString()} </td>
                          </tr>
                          <tr>
                            <td> Term In Years: </td>
                            <td> {trustData.data.numberOfYears.toString()} </td>
                          </tr>
                          <tr>
                            <td> Last Updated: </td>
                            <td> {trustData.data.lastTimestamp.toString().slice(0,25)} </td>
                          </tr>
                          <tr>
                            <td> Show Beneficiary Accounting: </td>
                            <td> {trustData.data.showBeneficiaryAccounting.toString()} </td>
                          </tr>
                          <tr>
                            <td> Gift: </td>
                            <td> ${(+ethers.utils.formatUnits(trustData.data.gift.toString(), 18)).toFixed(2)} </td>
                          </tr>
                          <tr>
                            <td> Retained Interest: </td>
                            <td> ${(trustData.data.annuityPV/(10**18)).toString()} </td>
                          </tr>
                          <tr>
                            <td> Initial Eth Amount: </td>
                            <td> {initialEthAmount} </td>
                          </tr>
                          <tr>
                            <td> Initial Eth Price: </td>
                            <td> ${(+initialEthPrice).toFixed(2)} </td>
                          </tr>
                          <tr>
                            <td> Initial USD Amount: </td>
                            <td> ${(+ethers.utils.formatUnits(trustData.data.initialGrant[0].usdPaymentAmount.toString(), 18)).toFixed(2)} </td>
                          </tr>
                          { testArray.map((payment, index ) => (
                            <tr key={index}>
                            <td>Payment {index + 1}</td>
                            <td>${+payment.toFixed(2)}</td>
                            </tr>
                          ))}

                          {/* {arrayOfTuples.map((tuple, index) => (
                                <tr key={index}>
                                    <td>{tuple[0]}</td>
                                    <td>{tuple[1]}</td>
                                </tr>
                          ))} */}
                            {/* {payments[0].map((payment, index) => (
                                <tr key={index}>
                                    <td>{today}/{(oneYearFromNow.getFullYear() + index + 1).toString()}</td>
                                    <td>${parseFloat(payment).toFixed(2)}</td>
                                </tr>
                            ))} */}
                        </tbody>
                        </table>
                </div>
            </Box>
          </Box>
    </>
  )
}

export default DataDisplay;