import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import { createCRUTFormState, accountState } from '../state/atoms';
import { getETHtoUSD, formatDollarValues } from '../utils/formHelperFunctions';
import { Grid, GridItem, Divider, Text, Heading, Switch, Button, Box, Center, UnorderedList, ListItem,
    NumberInput, FormControl, FormLabel, Input, NumberInputField, FormHelperText, InputGroup,
    Modal, ModalOverlay, ModalBody, ModalContent, ModalFooter, ModalHeader, SimpleGrid,
    Table, Tr, Td, Thead, Tbody, useDisclosure, Select
} from '@chakra-ui/react';
import { deployCRUT } from '../utils/deployTrust'; 

export function CreateCRUT() {
    const today = new Date().toLocaleDateString('en-us', { month:"numeric", day:"numeric"})
    const oneYearFromNow = new Date();
    const navigator = useNavigate();
    const [payments, setPayments] = useState([] as number[]);
    const [createCRUTData, setCreateCRUTData] = useRecoilState(createCRUTFormState);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [account, setAccount] = useRecoilState(accountState);
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    async function _handleGenerateSigning() {
        if(account == null) {
          alert('Please connect your wallet!');
          return;
        }
        let _validated = true;
        //Validate form data
        console.log(`These are the values: ${createCRUTData.toString()}`);
        if(createCRUTData.ethAmount <= 0) {
          alert('Enter an ETH Amount greater than 0!');
          _validated = false;
        }
        
        if(createCRUTData.usdValue <= 0) {
          _validated = false;
        }

        try {
          ethers.utils.getAddress(createCRUTData.annuant);
        } catch (e) {
          alert(`Please enter a valid annuant wallet address!: ${createCRUTData.annuant}`);
          _validated = false;
        }
        
        try {
          ethers.utils.getAddress(createCRUTData.trusteeAddress);
        } catch (e) {
          alert(`Please enter a valid trustee wallet address!: ${createCRUTData.trusteeAddress}`);
          _validated = false;
        }
        
        try {
          ethers.utils.getAddress(createCRUTData.charityAddress);
        } catch (e) {
          alert(`Please enter a valid beneficiary wallet address!: ${createCRUTData.charityAddress}`);
          _validated = false;
        }
  
        if(createCRUTData.termInYears < 2 || createCRUTData.termInYears > 99) {
          alert('Please enter a valid term (between 2 and 99 years)');
          _validated = false;
        }
  
        if(createCRUTData.percent < 5 || createCRUTData.percent > 50) {
          alert('The graduated percentage increase in payments must be between 0% and 20%');
          _validated = false;
        }
  
        if(_validated) {
          onOpen();
        }
      }

    async function getPayments() {
      let payments = [];
      let amtRemaining = createCRUTData.ethAmount;
      for(let year in Array.from({length: createCRUTData.termInYears}, (_, i) => i + 1)) {
        let payment = (createCRUTData.percent / 100) * amtRemaining;
        amtRemaining = amtRemaining - payment;
        payments.push(payment);
      }
      setPayments(payments);
    }

    useEffect(() => {
      getPayments();
    }, [createCRUTData]);
    return (
        <Grid templateColumns={'repeat(2,  1fr)'} gap={10}>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>ETH Amount</FormLabel>
                  <NumberInput defaultValue={createCRUTData.ethAmount} textColor={'white'}>
                    <NumberInputField id='ethAmount' onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                      //Need to update the value of eth in the create form object and calculate and update the USD value
                      let [usdValue, usdRounded] = await getETHtoUSD(+event.target.value);
                      setCreateCRUTData(createCRUTData.copyWith({ethAmount: +event.target.value, usdValue: usdValue}));
                    }}/>
                  </NumberInput>
                  <FormHelperText textColor={'#FF8A71'}>The ETH/USD value is an estimate. Due to slippage, the value of your contribution may differ at the time the contract is signed.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]} textAlign={'center'}>
                <Text className='gradient__text' fontWeight={'bold'} fontSize={['xl', 'xl', '3xl']}>Value in USD</Text>
                <Text textColor={'#FF8A71'} fontWeight={'bold'} fontSize={'2em'}>${formatDollarValues(createCRUTData.usdValue)}</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading className='gradient__text' fontSize={['3xl', '3xl', '5xl']}>Enter Grat Provisions</Heading>
                <Divider height={'10px'} borderColor={'gray.600'}/>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Annuant Address</FormLabel>
                  <Input defaultValue={createCRUTData.annuant} id='annuant' textColor={'white'} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCreateCRUTData(createCRUTData.copyWith({annuant: event.target.value}));
                  }}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Trustee Address</FormLabel>
                  <Input defaultValue={createCRUTData.trusteeAddress} id='trusteeAddress' textColor={'white'} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCreateCRUTData(createCRUTData.copyWith({trusteeAddress: event.target.value}));
                  }}/>
                  <FormHelperText textColor={'#FF8A71'}>The Trustee has the ability to liquidate the Trust, in which case all assets of the Trust will be transferred to the then current Trustee Wallet. The Trustee also has the ability to assign Trustee control to another wallet and change the charity wallet to a new qualifying address.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Charity Address</FormLabel>
                  <Input defaultValue={createCRUTData.charityAddress} id='charityAddress' textColor={'white'} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCreateCRUTData(createCRUTData.copyWith({charityAddress: event.target.value}));
                  }}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Term in Years</FormLabel>
                  <Select textColor={'white'} id='termInYears' value={createCRUTData.termInYears} onChange={((event: React.ChangeEvent<HTMLSelectElement>) => {setCreateCRUTData(createCRUTData.copyWith({termInYears: +event.target.value}))})}>
                    {
                      Array.from({length: 20}, (_, i) => i + 1).map((num: number) => (
                        <option style={{color: '#000000'}} value={num}>{num}</option>
                      ))
                    }
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 2, 1]}>
                <FormControl position={'relative'}>
                    <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Annuity Payment Percentage</FormLabel>
                    <Select textColor={'white'} id='percent' value={createCRUTData.percent} onChange={((event: React.ChangeEvent<HTMLSelectElement>) => {setCreateCRUTData(createCRUTData.copyWith({percent: +event.target.value}))})}>
                    {
                      Array.from({length: 226}, (_, i) => i + 25).map((num: number) => (
                        <option style={{color: '#000000'}} value={+((num * 0.2).toFixed(1))}>{(+(num * 0.2)).toFixed(1)}</option>
                      ))
                    }
                  </Select>
                  <FormHelperText textColor={'#FF8A71'}>The payment percentage must be between 5.0% and 50.0% and must result in at least 10% of the initial grant remaining for charity. See table here</FormHelperText>
                  </FormControl>
              </GridItem>
              <GridItem colSpan={2} textAlign={'center'}>
                <Button bgColor={'darksalmon'} width={['20rem','25rem']} fontSize={'1.1rem'} onClick={_handleGenerateSigning}>
                  GENERATE SIGNING DOCUMENT
                </Button>
                {
                  //Set up modal for results
                  <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior={'inside'}>
                    <ModalOverlay />
                    <ModalContent bgColor={'coral'} textColor={'black'} padding={['5px','15px']} maxW={['90%', '80%', '70%']}>
                      <br />
                      <ModalHeader>User Agreement</ModalHeader>
                      <ModalBody>
                        <SimpleGrid columns={2}>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Grantor Address:</Text>
                            <Text>{account}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Eth Amount:</Text>
                            <Text>{createCRUTData.ethAmount}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>USD Value:</Text>
                            <Text>${formatDollarValues(createCRUTData.usdValue)}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Annuant Address:</Text>
                            <Text>{createCRUTData.annuant}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Trustee Address:</Text>
                            <Text>{createCRUTData.trusteeAddress}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Beneficiary Address:</Text>
                            <Text>{createCRUTData.charityAddress}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Term in Years:</Text>
                            <Text>{createCRUTData.termInYears}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Graduated Payment %:</Text>
                            <Text>{createCRUTData.percent}%</Text>
                          </Box>
                        </SimpleGrid>
                        <br />
                        <Text>By signing this smart contract, you intend to create a trust with the following characteristics:<br /></Text>
                        <UnorderedList paddingLeft={'18px'}>
                          <ListItem>The Trust is irrevocable. Once you sign the smart contract, it cannot be canceled.</ListItem>
                          <ListItem>You are the Grantor and you own the wallet used to sign the smart contract (the “Grantor Wallet”).</ListItem>
                          <ListItem>You are funding the Trust with {createCRUTData.ethAmount} Ether cryptocurrency (“ETH”) having a current U.S. Dollar value of ${createCRUTData.usdValue}. Due to slippage, the value of your contribution may differ at the time the contract is signed. No additional contributions can be made to the Trust after signing the smart contract.</ListItem>
                          <ListItem>You are reserving a portion of the assets in the Trust as an annuity. On the day following each anniversary of signing the smart contract, the Trust will pay to the Annuant an amount of ETH equivalent to {createCRUTData.percent}% of Trust assets valued on the date of the payment, set forth in the following schedule:</ListItem>
                        </UnorderedList>
                        <br />
                        <Center>
                          <Table maxWidth={['25rem', '30rem']}>
                            <Thead bgColor={'white'}>
                              <Tr>
                                <Td fontWeight={'bold'} borderTopLeftRadius={'25px'}>Date</Td>
                                <Td fontWeight={'bold'} borderTopRightRadius={'25px'}>ETH Amount</Td>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {(() => {
                                return payments.map((p: number, index: number) => {
                                  console.log(`Payment: ${p}`);
                                  return (
                                    <Tr key={index}>
                                        <Td>{today}/{(oneYearFromNow.getFullYear() + index + 1).toString()}</Td>
                                        <Td>{p.toFixed(5)} ETH</Td>
                                    </Tr>
                                  )
                                });
                              })()
                              }
                            </Tbody>
                          </Table>
                        </Center>
                        <UnorderedList paddingLeft={'18px'}>
                          <ListItem>During the Trust Term, all scheduled payments will be paid to the Annuant Wallet, even if you are deceased. No payment will be made during the Term to any wallet other than the Annuant Wallet.</ListItem>
                          <ListItem>The Annuant is the person who owns the wallet with the public address {createCRUTData.annuant} (the “Annuant Wallet”). The Annuant has the ability to view the present value of the Trust, any payments made by the Trust, and the ending date for the Term.</ListItem>
                          <ListItem>The Charity is the who owns the wallet with the public address {createCRUTData.charityAddress} (the “Charity Wallet”) and who qualifies as tax-exempt under U.S. Code § 501(c)(3). The Charity has the ability to view the present value of the Trust, any payments made by the Trust, and the ending date for the Term.</ListItem>
                          <ListItem>The Trustee is the person who owns the wallet with the public address {createCRUTData.trusteeAddress} (the “Trustee Wallet”). The Trustee has the ability to liquidate the Trust, in which case all assets of the Trust will be transferred to the then current Trustee Wallet. The Trustee also has the ability to assign Trustee control to another wallet, to change the Charity Wallet if the Trustee determines the Charity is no longer has tax exempt status, and, to pay the then-currently specified Charity wallet at the expiration of the term, provided that the Trustee determines that Charity Wallet belongs to an organization having tax exempt status.</ListItem>
                          <ListItem>The Trust has a Term of {createCRUTData.termInYears} years. At the end of the Term, after all scheduled annuity payments have been made, the Trust will terminate and any assets remaining in the smart contract will be paid to the Charity Wallet.</ListItem>
                        </UnorderedList>
                        <br />
                        <Text>
                          By signing the smart contract, you acknowledge that use of a digital mechanism for forming a trust may not be permissible under your state's jurisdiction, has not been approved by the Internal Revenue Service, and has not been recognized in any court of law. You represent that you have sought appropriate financial and legal advice, and that you are not reliant on any representations or suggestions of Robotrust.xyz. You hereby waive any right for yourself, your heirs, and assigns to hold Robotrust.xyz liable for (i) any indirect, incidental, special, consequential or punitive damages, or financial loss, whether incurred directly or indirectly or resulting from your access to or use or inability to access or use Robotrust.xyz; or (ii) any conduct of a third party, including any unauthorized access, use, or alteration of your transmissions. You agree that any dispute arising out of or relating to the use of Robotrust.xyz, including the termination of the scope or applicability of this agreement to arbitrate, will be determined by arbitration in the state of Texas or another mutually agreed upon location, before one neutral arbitrator.
                        </Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button marginRight={'15px'} bgColor={'#00000000'} border={'2px solid'} onClick={onClose}>Back</Button>
                        <Button isLoading={isSubmitLoading} onClick={(async () => {
                          setIsSubmitLoading(true);
                          let _trustData = await deployCRUT(createCRUTData);
                          setIsSubmitLoading(false);
                          navigator('/profile');
                        })}>I Understand and Agree</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                }
              </GridItem>
            </Grid>
    );
}