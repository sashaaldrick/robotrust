import React from 'react'
import { useNavigate } from 'react-router-dom';
import './header.css';
// import people from '../../assets/people.png';
import robot from '../../assets/nevertrustarobot.png';
import { Box, Center, Heading, Text } from '@chakra-ui/react';

const Header = () => {
  const navigator = useNavigate();

  return (
    <Box>
      <div className="header section-padding" id="home">
        <div className="header-content"> 
          <h1 className="gradient__text"> 
          Trusts, on the blockchain
          </h1>
          <h2 className="gradient__text"> Decentralized, autonomous succession planning  </h2>
          <p> Control the disposition of your blockchain assets using a BAM Trust. Connect your wallet, set parameters, and deposit assets. Robotrust’s smart contract on Ethereum generates a legally valid trust and automatically administers it over time. Depending on how the smart contract is structured, some BAM Trusts qualify for favorable tax treatment.  </p>
          <p> <br></br> <b> Currently for demonstration purposes, our trusts work only on Arbitrum Rinkeby. </b> </p>
          <div className="header-content-input">
            <a onClick={(() => {
              navigator('/create');
            })}><button type="button">Get Started</button></a>
          </div>


        </div>

        <div className="header-image">
          <img src={robot} alt="robot" />
        </div>
      </div>
      <Box id='about' display={'flex'} flexDirection={'column'} margin={'0 2rem 1.75rem 1.75rem'} padding={'0 5rem 5rem 5rem'} textColor={'#81AFDD'}>
        <Heading>What is a BAM Trust?</Heading>
        <Text marginBottom={'16px'}>A Banta-Aldrick-Marlow (“BAM”) Trust is like a trust created using a traditional instrument, but is created by deployment of a smart contract. Trust provisions can be executed automatically without reliance on intermediaries and digital assets can be held in their native form. <span style={{fontWeight: 'bold'}}>Look out for our whitepaper (in progress).</span></Text>
        <Heading>Are blockchain trusts legally valid?</Heading>
        <Text marginBottom={'16px'}>Whether a trust is valid depends on state law. Many states recognize a trust as valid if the creator intended to create a trust when giving control to one party (the “trustee”) for the benefit of another distinct party (the “beneficiary”). Whether a trust qualifies for favorable tax treatment depends on whether its provisions limit the disposition of assets in accordance with tax codes. Robotrust’s interface is designed to evoke the intent necessary to form a valid trust. Depending on the type of trust chosen by the creator, the smart contract’s code ensures assets are distributed in accordance with federal tax codes. Given its novelty, the validity of this structure has yet to be tested in court. <span style={{fontWeight: 'bold'}}>Although it is likely a court would side with the taxpayer, you should exercise caution and seek the advice of an attorney before deploying Robotrust’s smart contract.</span></Text>
        <Heading>What types of trusts are supported?</Heading>
        <Text marginBottom={'16px'}>We currently support two common tax-planning structures. We are currently working on building trust structures with more customizability. If you have an idea for a trust structure, please reach out on discord.</Text>
        <Heading fontSize={'1.25rem'}>Grantor Retained Annuity Trust (GRAT)</Heading>
        <Text marginBottom={'16px'}>Pays an amount of the assets in trust back to you (the “grantor”) annually for the term of the trust. At the end of the term, the remaining assets are paid to the specified beneficiary and not includable in your gross estate.</Text>
        <Heading fontSize={'1.25rem'}>Charitable Remainder Unitrust (CRUT)</Heading>
        <Text marginBottom={'16px'}>Pays a percentage of the assets in trust to a specified party annually for the term of the trust. At the end of the term, the remaining assets are paid to a specified charity. The charity and you can both participate in the assets’ appreciation and you can immediately deduct a large portion of the gift from your taxes. </Text>
      </Box>
    </Box>
  );
}

export default Header;
