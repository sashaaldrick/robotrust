import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ethers } from 'ethers';
import { Box, BreadcrumbLink, Button, Center, Divider, Grid, GridItem, Heading, Table, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';
import { accountState } from '../state/atoms';
import { Trust, BeneficiaryTrust, CRUT } from '../utils/trust';
import { getGrantorTrustData, getTrusteeTrustData, getBeneficiaryTrustData, getCRUTData } from '../utils/profileHelperFunctions';
import { TrustDisplay } from './TrustDisplay';
import { BeneficiaryTrustDisplay } from './BeneficiaryTrustDisplay'

export function Profile() {
    const [tab, setTab] = useState(0);
    const [trustList, setTrustList] = useState([] as Trust[]);
    const [beneficiaryTrustList, setBeneficiaryTrustList] = useState([] as BeneficiaryTrust[]);
    const [crutList, setCRUTList] = useState([] as CRUT[])
    const [account, setAccount] = useRecoilState(accountState);
    
    const getTrusts = async (_tab: number) => {
        switch(_tab) {
            case 1: {
                //Get trusts where user is Trustee on
                console.log('getting trustee trusts');
                let trusts: Trust[] = await getTrusteeTrustData();
                trusts.sort((a, b) => +b.initialGrant.paymentTimestamp - +a.initialGrant.paymentTimestamp);
                //console.log(`Trusts: ${trusts}`);
                setTrustList(trusts);
                setBeneficiaryTrustList([]);
                setCRUTList([]);
                break;
            }
            case 2: {
                //Get trusts where user is beneficiary
                console.log('getting beneficiary trusts');
                let trusts: BeneficiaryTrust[] = await getBeneficiaryTrustData();
                trusts.sort((a, b) => +b.startedTimestamp - +a.startedTimestamp);
                //console.log(`Trusts: ${trusts}`);
                setBeneficiaryTrustList(trusts);
                setTrustList([]);
                setCRUTList([]);
                break;
            }
            case 3: {
                //get cruts
                console.log('getting cruts');
                let trusts: CRUT[] = await getCRUTData();
                trusts.sort((a, b) => +b.initialGrant.paymentTimestamp - +a.initialGrant.paymentTimestamp);
                setBeneficiaryTrustList([]);
                setTrustList([]);
                setCRUTList(trusts);
                break;
            }
            default: {
                console.log('getting my trusts');
                let trusts: Trust[] = await getGrantorTrustData();
                trusts.sort((a, b) => +b.initialGrant.paymentTimestamp - +a.initialGrant.paymentTimestamp);
                //console.log(`Trusts: ${trusts}`);
                setTrustList(trusts);
                setBeneficiaryTrustList([]);
                setCRUTList([]);
            }
        }
    }



    const _changeTab = (_tab: number) => {
        console.log('tab %s', _tab);
        setTab(_tab);
    }

    useEffect(() => {
        getTrusts(tab);
    }, [tab]);


    return (
        <Box paddingLeft={['15px', '25px', '100px']} paddingTop={'20px'} paddingRight={['15px', '25px', '100px']} paddingBottom={'20px'}>
            <Box display={'flex'}>
                <Button margin={'10px'} bgColor={tab === 0 ? '#FF8A71' : 'white'} textColor={tab === 0 ? 'white' : 'black'} onClick={(() => _changeTab(0))}>My Trusts</Button>
                <Button margin={'10px'} bgColor={tab === 1 ? '#FF8A71' : 'white'} textColor={tab === 1 ? 'white' : 'black'} onClick={(() => _changeTab(1))}>Trustee On</Button>
                <Button margin={'10px'} bgColor={tab === 2 ? '#FF8A71' : 'white'} textColor={tab === 2 ? 'white' : 'black'} onClick={(() => _changeTab(2))}>Beneficiary On</Button>
                <Button margin={'10px'} bgColor={tab === 3 ? '#FF8A71' : 'white'} textColor={tab === 3 ? 'white' : 'black'} onClick={(() => _changeTab(3))}>CRUTs</Button>    
            </Box>
            {
                trustList.length > 0 ? 
                trustList.map((trust: Trust, index: number) => (
                        <TrustDisplay key={index} trust={trust} />     
                ))
                : ''
            }
            {
                beneficiaryTrustList.length > 0 ? 
                beneficiaryTrustList.map((trust: BeneficiaryTrust, index: number) => (
                    <BeneficiaryTrustDisplay key={index} trust={trust} />
                ))
                : ''
            }
            {
                crutList.length > 0 ? 
                    crutList.map((trust: CRUT, index: number) => {
                        return (
                            <Box margin={'20px 20px 30px 20px'} textColor={'#FF8A71'} bgColor={'white'} borderRadius={'10px'} padding={'10px'} key={index}>
                                <Box display={'flex'} justifyContent={'space-between'} flexDirection={['column', 'column', 'column', 'row']}>
                                    <Heading fontSize={'18px'}><span style={{color: '#042c54'}}>Trust Address: </span> {trust.contractAddress}</Heading>
                                    <Text textColor={'#042c54'}>Date Started: {trust.initialGrant.paymentTimestamp.toDateString()}</Text>
                                </Box>
                                <Divider />
                                <Grid templateColumns={'repeat(4, 1fr)'} gap={5}>
                                    <GridItem colSpan={[4, 4, 2]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Annuant</Text>
                                        <Text>{trust.annuant}</Text>    
                                    </GridItem>
                                    <GridItem colSpan={[4, 4, 2]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Grantor</Text>
                                        <Text>{trust.owner}</Text>    
                                    </GridItem>
                                    <GridItem colSpan={[4, 4, 2]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Trustee</Text>
                                        <Text>{trust.trustee}</Text>    
                                    </GridItem>
                                    <GridItem colSpan={[4, 4, 2]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Charity</Text>
                                        <Text>{trust.charity}</Text>    
                                    </GridItem>
                                    <GridItem colSpan={[2, 2, 1]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Number of Years</Text>
                                        <Text>{+trust.numberOfYears}</Text>   
                                    </GridItem>
                                    <GridItem colSpan={[2, 2, 1]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Termination Date</Text>
                                        <Text>{(() => {
                                            const startDate = new Date(trust.initialGrant.paymentTimestamp.getTime());
                                            startDate.setFullYear(startDate.getFullYear() + (+trust.numberOfYears));
                                            return (startDate.toDateString());
                                        })()}</Text>   
                                    </GridItem>
                                    <GridItem colSpan={[2, 2, 1]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Initial ETH Amount</Text>
                                        <Text>{(+ethers.utils.formatUnits(trust.initialGrant.ethPaid, 18)).toFixed(5)}</Text>   
                                    </GridItem>
                                    <GridItem colSpan={[2, 2, 1]}>
                                        <Text fontWeight={'bold'} textColor={'#042c54'}>Initial USD Value</Text>
                                        <Text>${(+ethers.utils.formatUnits(trust.initialGrant.usdPaymentAmount, 18)).toFixed(2)}</Text>   
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
                                                            trust.payments.map((x, index) => (
                                                                <Tr key={index}>
                                                                    <Td textAlign={'center'}>{x ? ethers.utils.formatUnits(x?.ethPaid, 18) : ''}</Td>
                                                                    <Td textAlign={'center'}>{x ? `$${ethers.utils.formatUnits(x?.usdPaymentAmount, 18)}` : ''}</Td>
                                                                    <Td textAlign={'center'}>{x ? x.paymentTimestamp.toDateString() : ''}</Td>
                                                                </Tr>
                                                            ))
                                                        }
                                                    </Tbody>
                                                </Table>
                                                <br />
                                                <br />
                                                <Text fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Expected Payments</Text>
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>Date</Td>
                                                            <Td fontWeight={'bold'} textAlign={'center'} textColor={'#042c54'}>ETH Amount</Td>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {(() => {
                                                            const payments = [];
                                                            var amtRemaining = +ethers.utils.formatUnits(trust.initialGrant.ethPaid, 18);
                                                            for(const year in Array.from({length: trust.numberOfYears}, (_, i) => i + 1)) {
                                                              const payment = (trust.percent / 1000) * amtRemaining;
                                                              amtRemaining = amtRemaining - payment;
                                                              payments.push(payment);
                                                            }

                                                            return (
                                                                payments.map((x, index) => {
                                                                    const _startDate = new Date(trust.initialGrant.paymentTimestamp.getTime());
                                                                    _startDate.setFullYear(_startDate.getFullYear() + index + 1);
                                                                    return (
                                                                    <Tr key={index}>
                                                                        <Td textAlign={'center'}>{_startDate.toDateString()}</Td>
                                                                        <Td textAlign={'center'}>{x.toFixed(5)}</Td>
                                                                    </Tr>
                                                                )}
                                                              )
                                                            );
                                                        })()}
                                                    </Tbody>
                                                </Table>
                                            </Box>
                                        </Center>
                                    </GridItem>
                                </Grid>
                            </Box>
                        );
                    })
                : ''
            }
        </Box>
    );
}