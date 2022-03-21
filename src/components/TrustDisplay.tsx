import { ethers } from 'ethers';
import { Box, Grid, GridItem, Heading, Text, Divider, Center,
    Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import { Trust } from '../utils/trust';

export function TrustDisplay(props: any) {
    let trust: Trust = props.trust;
    return (
        <Box margin={'20px 20px 30px 20px'} textColor={'#FF8A71'} bgColor={'white'} borderRadius={'10px'} padding={'10px'}>
            <Box display={'flex'} justifyContent={'space-between'} flexDirection={['column', 'column', 'column', 'row']}>
                <Heading fontSize={'18px'}><span style={{color: '#042c54'}}>Trust Address: </span> {trust.trustAddress}</Heading>
                <Text textColor={'#042c54'}>Date Started: {trust.initialGrant.paymentTimestamp.toDateString()}</Text>
            </Box>
            <Divider />
            <Grid templateColumns={'repeat(4, 1fr)'} gap={5}>
                <GridItem colSpan={[4, 4, 2]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Trustee</Text>
                    <Text>{trust.trustee}</Text>    
                </GridItem>
                <GridItem colSpan={[4, 4, 2]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Beneficiary</Text>
                    <Text>{trust.beneficiary}</Text>    
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>ETH Amount</Text>
                    <Text>{ethers.utils.formatUnits(trust.initialGrant.ethPaid, 18)}</Text>    
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>USD Value</Text>
                    <Text>${(+ethers.utils.formatUnits(trust.initialGrant.usdPaymentAmount, 18)).toFixed(2)}</Text>    
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Retained Interest</Text>
                    <Text>${(+ethers.utils.formatUnits(trust.annuityPV, 18)).toFixed(2)}</Text>   
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Estimated Gift</Text>
                    <Text>${(+ethers.utils.formatUnits(trust.gift, 18)).toFixed(2)}</Text>   
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Number of Years</Text>
                    <Text>{+trust.numberOfYears}</Text>   
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Show Beneficiary Accounting?</Text>
                    <Text>{trust.showBeneficiaryAccounting ? 'Yes' : 'No'}</Text>   
                </GridItem>
                <GridItem colSpan={4}>
                    <Center>
                        <Box overflowX={'scroll'}>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Date</Td>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Payment Amount (USD)</Td>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>ETH Paid</Td>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Amount Paid (USD)</Td>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Payment Date</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        trust.paymentAmounts.map((x, index) => (
                                            <Tr key={index}>
                                                <Td textAlign={'center'}>{trust.initialGrant.paymentTimestamp.toLocaleDateString('en-us', { month:"numeric", day:"numeric"})}/{(trust.initialGrant.paymentTimestamp.getFullYear() + index + 1).toString()}</Td>
                                                <Td textAlign={'center'}>${(+ethers.utils.formatUnits(x, 18)).toFixed(2)}</Td>
                                                <Td textAlign={'center'}>{trust.payments[index] ? ethers.utils.formatUnits(trust.payments[index]?.ethPaid, 18) : ''}</Td>
                                                <Td textAlign={'center'}>{trust.payments[index] ? `$${ethers.utils.formatUnits(trust.payments[index]?.usdPaymentAmount, 18)}` : ''}</Td>
                                                <Td textAlign={'center'}>{trust.payments[index] ? trust.payments[index]?.paymentTimestamp.toDateString() : ''}</Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </Box>
                    </Center>
                </GridItem>
            </Grid>
        </Box>
    );
}