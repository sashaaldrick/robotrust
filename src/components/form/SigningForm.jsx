import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import useCalculateFirstPayment from '../../hooks/useCalculateFirstPayment'

const SigningForm = (values) => {
    const payments = useCalculateFirstPayment(values)
    const today = new Date().toLocaleDateString('en-us', { month:"numeric", day:"numeric"})
    var oneYearFromNow = new Date();
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
                <Typography variant="h3" sx={{color: '#FF8A71'}}>User Agreement</Typography>
                <Divider />
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography style={{color: 'white'}}>By signing this smart contract, you intend to create a trust with the following characteristics:                        </Typography>
                        <ul>
                            <li><Typography style={{color: 'white'}}>The Trust is irrevocable. Once you sign the smart contract, it cannot be canceled.</Typography></li>
                            <li><Typography style={{color: 'white'}}>You are the Grantor and you own the wallet used to sign the smart contract (the “Grantor Wallet”).</Typography></li>
                            <li><Typography style={{color: 'white'}}>You are funding the Trust with {"#"} Ether cryptocurrency (“ETH”) having a current U.S. Dollar value of {"$"}. Due to slippage, the value of your contribution may differ at the time the contract is signed. No additional contributions can be made to the Trust after signing the smart contract.</Typography></li>
                            <li><Typography style={{color: 'white'}}>You are retaining an interest in the Trust in the form of an annuity with a present value of {"$"}. On the day following each anniversary of signing the smart contract, the Trust will pay your Grantor Wallet an amount of ETH equivalent to the U.S. Dollar value set forth in the following schedule: </Typography></li>
                        </ul>
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
                            {payments[0].map((payment, index) => (
                                <tr key={index}>
                                    <td>{today}/{(oneYearFromNow.getFullYear() + index + 1).toString()}</td>
                                    <td>${parseFloat(payment).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                </div>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Typography style={{color: 'white'}}>During the Trust Term, all scheduled payments will be paid to your Grantor Wallet, even if you are deceased. No payment will be made during the Term to any wallet other than your Grantor Wallet.</Typography>
                    <ul>
                        <li><Typography style={{color: 'white'}}>The Beneficiary is the person who owns the wallet with the public address {"0x…"} (the “Beneficiary Wallet”). The Beneficiary {"has/does not have"} the ability to view the present value of the Trust, any payments made by the Trust, and the ending date for the Term.</Typography></li>
                        <li><Typography style={{color: 'white'}}>The Trustee is the person who owns the wallet with the public address {"0x…"} (the “Trustee Wallet”). The Trustee has the ability to liquidate the Trust, in which case all assets of the Trust will be transferred to the then current Trustee Wallet. The Trustee also has the ability to assign Trustee control to another wallet.</Typography></li>
                        <li><Typography style={{color: 'white'}}>The Trust has a Term of {"#"} years. At the end of the Term, after all scheduled annuity payments have been made, the Trust will terminate and any assets remaining in the smart contract will be paid to the Beneficiary Wallet.</Typography></li>
                    </ul>
                    <br></br>
                    <Typography style={{color: 'white'}}>
                    By signing the smart contract, you acknowledge that use of a digital mechanism for forming a trust may not be permissible under your state's jurisdiction, has not been approved by the Internal Revenue Service, and has not been recognized in any court of law. You represent that you have sought appropriate financial and legal advice, and that you are not reliant on any representations or suggestions of Robotrust.xyz. You hereby waive any right for yourself, your heirs, and assigns to hold Robotrust.xyz liable for (i) any indirect, incidental, special, consequential or punitive damages, or financial loss, whether incurred directly or indirectly or resulting from your access to or use or inability to access or use Robotrust.xyz; or (ii) any conduct of a third party, including any unauthorized access, use, or alteration of your transmissions. You agree that any dispute arising out of or relating to the use of Robotrust.xyz, including the termination of the scope or applicability of this agreement to arbitrate, will be determined by arbitration in the state of Texas or another mutually agreed upon location, before one neutral arbitrator.
                    </Typography>
                </Box>
            </Box>
          </Box>
    </>
  )
}

export default SigningForm