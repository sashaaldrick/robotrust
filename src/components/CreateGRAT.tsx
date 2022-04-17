import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { createTrustFormState, accountState } from '../state/atoms';
import { getFirstPayment, getPayments, getETHtoUSD, formatDollarValues } from '../utils/formHelperFunctions';
import { Grid, GridItem, Divider, Text, Heading, Switch, Button, Box, Center, UnorderedList, ListItem,
    NumberInput, FormControl, FormLabel, Input, NumberInputField, FormHelperText, InputGroup,
    Modal, ModalOverlay, ModalBody, ModalContent, ModalFooter, ModalHeader, SimpleGrid,
    Table, Tr, Td, Thead, Tbody, useDisclosure
} from '@chakra-ui/react';
import { deployTrust } from '../utils/deployTrust'; 

export function CreateGRAT() {
    const _interestRate = 0.022;
    const navigator = useNavigate();
    const today = new Date().toLocaleDateString('en-us', { month:"numeric", day:"numeric"})
    const oneYearFromNow = new Date();
    const [createFormData, setCreateFormData] = useRecoilState(createTrustFormState);
    const [showGraduatedPayment, setShowGraduatedPayment] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [paymentArray, setPaymentArray] = useState([] as number[]);
    const [account, setAccount] = useRecoilState(accountState);
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    async function _handleGenerateSigning() {
        if(account == null) {
          alert('Please connect your wallet!');
          return;
        }
        let _validated = true;
        //Validate form data
        console.log(`These are the values: ${createFormData.toString()}`);
        if(createFormData.ethAmount <= 0) {
          alert('Enter an ETH Amount greater than 0!');
          _validated = false;
        }
        
        if(createFormData.usdValue <= 0) {
          _validated = false;
        }
        
        try {
          ethers.utils.getAddress(createFormData.trusteeAddress);
        } catch (e) {
          alert('Please enter a valid trustee wallet address!');
          _validated = false;
        }
        
        try {
          ethers.utils.getAddress(createFormData.beneficiaryAddress);
        } catch (e) {
          alert('Please enter a valid beneficiary wallet address!');
          _validated = false;
        }
  
        if(createFormData.retainedInterest <= 0) {
          alert("You're retained interest must be greater than 0");
          _validated = false;
        }
  
        if(createFormData.termInYears < 2 || createFormData.termInYears > 99) {
          alert('Please enter a valid term (between 2 and 99 years)');
          _validated = false;
        }
  
        if(createFormData.graduatedPercentage < 0 || createFormData.graduatedPercentage > 0.2) {
          alert('The graduated percentage increase in payments must be between 0% and 20%');
          _validated = false;
        }
  
        if(_validated) {
          //process payments
          let firstPayment = getFirstPayment(createFormData.retainedInterest, _interestRate, createFormData.graduatedPercentage, createFormData.termInYears);
          let paymentsArray = getPayments(firstPayment, createFormData.termInYears, createFormData.graduatedPercentage);
          //console.log(`First Payments: ${firstPayment} - ${paymentsArray}`);
          setPaymentArray(paymentsArray);
          onOpen();
        }
      }

    return (
        <Grid templateColumns={'repeat(2,  1fr)'} gap={10}>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>ETH Amount</FormLabel>
                  <NumberInput defaultValue={createFormData.ethAmount} textColor={'white'}>
                    <NumberInputField id='ethAmount' onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                      //Need to update the value of eth in the create form object and calculate and update the USD value
                      let [usdValue, usdRounded] = await getETHtoUSD(+event.target.value);
                      setCreateFormData(createFormData.copyWith({ethAmount: +event.target.value, usdValue: usdValue}));
                    }}/>
                  </NumberInput>
                  <FormHelperText textColor={'#FF8A71'}>The ETH/USD value is an estimate. Due to slippage, the value of your contribution may differ at the time the contract is signed.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]} textAlign={'center'}>
                <Text className='gradient__text' fontWeight={'bold'} fontSize={['xl', 'xl', '3xl']}>Value in USD</Text>
                <Text textColor={'#FF8A71'} fontWeight={'bold'} fontSize={'2em'}>${formatDollarValues(createFormData.usdValue)}</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading className='gradient__text' fontSize={['3xl', '3xl', '5xl']}>Enter Grat Provisions</Heading>
                <Divider height={'10px'} borderColor={'gray.600'}/>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Trustee Address</FormLabel>
                  <Input defaultValue={createFormData.trusteeAddress} id='trusteeAddress' textColor={'white'} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCreateFormData(createFormData.copyWith({trusteeAddress: event.target.value}));
                  }}/>
                  <FormHelperText textColor={'#FF8A71'}>The Trustee has the ability to liquidate the Trust, in which case all assets of the Trust will be transferred to the then current Trustee Wallet. The Trustee also has the ability to assign Trustee control to another wallet.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Beneficiary Address</FormLabel>
                  <Input defaultValue={createFormData.beneficiaryAddress} id='beneficiaryAddress' textColor={'white'} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCreateFormData(createFormData.copyWith({beneficiaryAddress: event.target.value}));
                  }}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Retained Interest</FormLabel>
                  <NumberInput defaultValue={createFormData.retainedInterest} textColor={'white'}>
                    <NumberInputField id='retainedInterest' onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCreateFormData(createFormData.copyWith({retainedInterest: +event.target.value}));
                    }}/>
                  </NumberInput>
                  <FormHelperText textColor={'#FF8A71'}>The estimated gift includable in your estate is equal to the grant amount minus the retained interest.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <FormControl>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Term in Years</FormLabel>
                  <NumberInput textColor={'white'} defaultValue={createFormData.termInYears}>
                    <NumberInputField id='termInYears' onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setCreateFormData(createFormData.copyWith({termInYears: +event.target.value}));
                    }}/>
                  </NumberInput>
                  <FormHelperText textColor={'#FF8A71'}>Warning: Setting this value lower than ‘2’ may result in nonrecognition by the IRS.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem colSpan={[2, 2, 1]}>
                <Text className='gradient__text'  fontSize={['xl', 'xl', '3xl']}>Interest Rate</Text>
                <Text textColor={'#FF8A71'} fontSize={'xl'}>{(_interestRate * 100).toFixed(1)}%</Text>
              </GridItem>
              <GridItem colSpan={[2, 2, 2, 1]}>
                <FormControl display={'flex'} alignItems={'center'}>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Allow Beneficiary to view accounting?</FormLabel>
                  <Switch id='showAccounting' defaultChecked={createFormData.showBeneficiaryAccount} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCreateFormData(createFormData.copyWith({showBeneficiaryAccount: event.target.checked}));
                  }}/>
                </FormControl>
                <FormControl display={'flex'} alignItems={'center'}>
                  <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Increasing Annuity Payments?</FormLabel>
                  <Switch defaultChecked={showGraduatedPayment} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setShowGraduatedPayment(event.target.checked);
                  }}/>
                </FormControl>
                {showGraduatedPayment ? 
                  <FormControl position={'relative'}>
                    <FormLabel className='gradient__text' fontSize={['xl', 'xl', '3xl']}>Graduated Percentage</FormLabel>
                    <InputGroup>
                      <NumberInput defaultValue={createFormData.graduatedPercentage * 100} borderTopRightRadius={'0px'} format={((value) => {
                        return `${value}%`
                      })}>
                        <NumberInputField id='graduatedPercentage' 
                          textColor={'white'} 
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          setCreateFormData(createFormData.copyWith({graduatedPercentage: (+(event.target.value.replace('%', '')) / 100)}));
                        }}/>
                      </NumberInput>
                    </InputGroup>
                    <FormHelperText textColor={'#FF8A71'}>Warning: Setting the graduation rate higher than 20% may result in nonrecognition by the IRS.</FormHelperText>
                  </FormControl>
                : ''}
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
                            <Text>{createFormData.ethAmount}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>USD Value:</Text>
                            <Text>${formatDollarValues(createFormData.usdValue)}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Trustee Address:</Text>
                            <Text>{createFormData.trusteeAddress}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Beneficiary Address:</Text>
                            <Text>{createFormData.beneficiaryAddress}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Retained Interest:</Text>
                            <Text>${formatDollarValues(createFormData.retainedInterest)}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Term in Years:</Text>
                            <Text>{createFormData.termInYears}</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Interest Rate:</Text>
                            <Text>{(_interestRate * 100).toFixed(1)}%</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Graduated Payment %:</Text>
                            <Text>{createFormData.graduatedPercentage * 100}%</Text>
                          </Box>
                          <Box margin={'10px'}>
                            <Text fontWeight={'bold'}>Show Beneficiary Account:</Text>
                            <Text>{createFormData.showBeneficiaryAccount ? 'Yes' : 'No'}</Text>
                          </Box>
                        </SimpleGrid>
                        <br />
                        <Text>By signing this smart contract, you intend to create a trust with the following characteristics:<br /></Text>
                        <UnorderedList paddingLeft={'18px'}>
                          <ListItem>The Trust is irrevocable. Once you sign the smart contract, it cannot be canceled.</ListItem>
                          <ListItem>You are the Grantor and you own the wallet used to sign the smart contract (the “Grantor Wallet”).</ListItem>
                          <ListItem>You are funding the Trust with # Ether cryptocurrency (“ETH”) having a current U.S. Dollar value of $. Due to slippage, the value of your contribution may differ at the time the contract is signed. No additional contributions can be made to the Trust after signing the smart contract.</ListItem>
                          <ListItem>You are retaining an interest in the Trust in the form of an annuity with a present value of $. On the day following each anniversary of signing the smart contract, the Trust will pay your Grantor Wallet an amount of ETH equivalent to the U.S. Dollar value set forth in the following schedule:</ListItem>
                        </UnorderedList>
                        <br />
                        <Center>
                          <Table maxWidth={['25rem', '30rem']}>
                            <Thead bgColor={'white'}>
                              <Tr>
                                <Td fontWeight={'bold'} borderTopLeftRadius={'25px'}>Date</Td>
                                <Td fontWeight={'bold'} borderTopRightRadius={'25px'}>Annuity in U.S. Dollars</Td>
                              </Tr>
                            </Thead>
                            <Tbody>
                          {/* Need to create table for payments */
                            paymentArray.map((payment, index) => (
                              <Tr key={index}>
                                  <Td>{today}/{(oneYearFromNow.getFullYear() + index + 1).toString()}</Td>
                                  <Td>${formatDollarValues(payment)}</Td>
                              </Tr>
                          ))
                          }
                            </Tbody>
                          </Table>
                        </Center>
                        <br />
                        <Text>During the Trust Term, all scheduled payments will be paid to your Grantor Wallet, even if you are deceased. No payment will be made during the Term to any wallet other than your Grantor Wallet.</Text>
                        <UnorderedList paddingLeft={'18px'}>
                          <ListItem>The Beneficiary is the person who owns the wallet with the public address 0x… (the “Beneficiary Wallet”). The Beneficiary has/does not have the ability to view the present value of the Trust, any payments made by the Trust, and the ending date for the Term.</ListItem>
                          <ListItem>The Trustee is the person who owns the wallet with the public address 0x… (the “Trustee Wallet”). The Trustee has the ability to liquidate the Trust, in which case all assets of the Trust will be transferred to the then current Trustee Wallet. The Trustee also has the ability to assign Trustee control to another wallet.</ListItem>
                          <ListItem>The Trust has a Term of # years. At the end of the Term, after all scheduled annuity payments have been made, the Trust will terminate and any assets remaining in the smart contract will be paid to the Beneficiary Wallet.</ListItem>
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
                          let dataWithInterest = createFormData.copyWith({interestRate: _interestRate});
                          let _trustData = await deployTrust(dataWithInterest);
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