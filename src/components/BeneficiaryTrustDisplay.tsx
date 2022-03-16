import { ethers } from 'ethers';
import { Box, Grid, GridItem, Heading, Text, Divider, Center,
    Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import { BeneficiaryTrust } from '../utils/trust';
import { processPaymentData } from '../utils/payment';

export function BeneficiaryTrustDisplay(props: any) {
    let trust: BeneficiaryTrust = props.trust;
    return (
        <Box margin={'20px 20px 30px 20px'} textColor={'#FF8A71'} bgColor={'white'} borderRadius={'10px'} padding={'10px'}>
            <Box display={'flex'} justifyContent={'space-between'} flexDirection={['column', 'column', 'column', 'row']}>
                <Heading fontSize={'18px'}><span style={{color: '#042c54'}}>Trust Address: </span> {trust.contractAddress}</Heading>
                <Text textColor={'#042c54'}>Date Started: {trust.startedTimestamp.toDateString()}</Text>
            </Box>
            <Divider />
            <Grid templateColumns={'repeat(4, 1fr)'} gap={5}>
                <GridItem colSpan={[4, 4, 2]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Beneficiary</Text>
                    <Text>{trust.owner}</Text>    
                </GridItem>
                <GridItem colSpan={[4, 4, 2]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Trustee</Text>
                    <Text>{trust.trustee}</Text>    
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Amount Remaining</Text>
                    <Text>{ethers.utils.formatUnits(trust.amountRemaining, 18)}</Text>    
                </GridItem>
                <GridItem colSpan={[2, 2, 1]}>
                    <Text fontWeight={'bold'} textColor={'#042c54'}>Number of Years</Text>
                    <Text>{+trust.numberOfYears}</Text>   
                </GridItem>
                <GridItem colSpan={4}>
                    <Center>
                        <Box overflowX={'scroll'}>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>ETH Paid</Td>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Amount Paid (USD)</Td>
                                        <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Payment Date</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        processPaymentData(trust.payments).map((x, index) => (
                                            <Tr key={index}>
                                                <Td textAlign={'center'}>{x ? ethers.utils.formatUnits(x?.ethPaid, 18) : ''}</Td>
                                                <Td textAlign={'center'}>{x ? `$${ethers.utils.formatUnits(x?.usdPaymentAmount, 18)}` : ''}</Td>
                                                <Td textAlign={'center'}>{x ? x.paymentTimestamp.toDateString() : ''}</Td>
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