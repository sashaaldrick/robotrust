import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ethers } from 'ethers';
import { Box, BreadcrumbLink, Button, Divider, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { accountState } from '../state/atoms';
import { Trust, BeneficiaryTrust } from '../utils/trust';
import { getGrantorTrustData, getTrusteeTrustData, getBeneficiaryTrustData } from '../utils/profileHelperFunctions';
import { TrustDisplay } from './TrustDisplay';
import { BeneficiaryTrustDisplay } from './BeneficiaryTrustDisplay'

export function Profile() {
    const [tab, setTab] = useState(0);
    const [trustList, setTrustList] = useState([] as Trust[]);
    const [beneficiaryTrustList, setBeneficiaryTrustList] = useState([] as BeneficiaryTrust[]);
    const [account, setAccount] = useRecoilState(accountState);
    
    const getTrusts = async (_tab: number) => {
        switch(_tab) {
            case 1: {
                //Get trusts where user is Trustee on
                console.log('getting trustee trusts');
                let trusts: Trust[] = await getTrusteeTrustData();
                //console.log(`Trusts: ${trusts}`);
                setTrustList(trusts);
                setBeneficiaryTrustList([]);
                break;
            }
            case 2: {
                //Get trusts where user is beneficiary
                console.log('getting beneficiary trusts');
                let trusts: BeneficiaryTrust[] = await getBeneficiaryTrustData();
                //console.log(`Trusts: ${trusts}`);
                setBeneficiaryTrustList(trusts);
                setTrustList([]);
                break;
            }
            default: {
                console.log('getting my trusts');
                let trusts: Trust[] = await getGrantorTrustData();
                //console.log(`Trusts: ${trusts}`);
                setTrustList(trusts);
                setBeneficiaryTrustList([]);
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
        </Box>
    );
}