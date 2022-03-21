import React, { useState, ChangeEvent } from 'react';
import { Box, Grid, GridItem, Heading, Text, FormControl, 
  FormLabel, FormHelperText, NumberInput, NumberInputField, Divider, 
  Input, InputGroup, InputRightElement, Switch, Button, useDisclosure,
  Modal, ModalOverlay, ModalHeader, ModalBody, ModalFooter, ModalContent, UnorderedList, ListItem,
  Table, Thead, Tbody, Tr, Td, InputRightAddon, Center, SimpleGrid } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { accountState, connectButtonClickedState, createTrustFormState } from '../state/atoms';
import { getETHtoUSD, formatDollarValues, getFirstPayment, getPayments } from '../utils/formHelperFunctions';
import { deployTrust } from '../utils/deployTrust';
import { CreateGRAT } from './CreateGRAT';
import { CreateCRUT } from './CreateCRUT';
import { ethers } from 'ethers';
import { get7520Rate } from '../utils/irs_scraper';

function CreateTrust() {
    const [isCRUT, setIsCRUT] = useState(true);
    // const [interestRate, setInterestRate] = useState(0);
    const [account, setAccount] = useRecoilState(accountState);
    const [createFormData, setCreateFormData] = useRecoilState(createTrustFormState);
    /*
    useEffect(() => {
      get7520Rate().then((result: any) => setInterestRate(result));
    })
*/
    
    
    return (
          <Box paddingLeft={['15px', '25px', '100px']} paddingTop={'20px'} paddingRight={['15px', '25px', '100px']} paddingBottom={'20px'}>
            <Box>
              <Button margin={'10px'} bgColor={isCRUT ? 'salmon' : 'white'} onClick={(() => setIsCRUT(true))}>CRUT</Button>
              <Button margin={'10px'} bgColor={!isCRUT ? 'salmon' : 'white'} onClick={(() => setIsCRUT(false))}>GRAT</Button>
            </Box>
            {
              isCRUT ? <CreateCRUT /> : <CreateGRAT />
            }
          </Box>
    )
  };
  
export default CreateTrust;