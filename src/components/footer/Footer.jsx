import React from 'react';
import { Box, Text, Heading, Image, Stack, Link } from '@chakra-ui/react';
import logo from '../../assets/Robotrust_Logos-08.png';
import twitterIcon from '../../assets/twitter.svg'
import './footer.css';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <Box className="footer section-padding">
    {/* <Box className="footer-heading">
      <h1 className="gradient__text">Do you want to step in to the future before others</h1>
    </Box>

    <Box className="footer-btn">
      <Text>Request Early Access</Text>
    </Box> */}

    <Box className="footer-links" textColor={'white'}>
      <Box className="footer-links-logo">
        <Image src={logo} alt="robotrust_logo" />
        <Text> In the metaverse 😎 <br /> </Text>
      </Box>
      {/* <Box className="footer-links-Box">
        <Heading fontSize={['md', 'lg']}>Links</Heading>
        <Text>Social Media</Text>
        <Text>Contact</Text>
      </Box> */}
      <Box className="footer-links-Box">
        <Heading fontSize={['md', 'lg']}>Company</Heading>
        <Text>Terms & Conditions </Text>
        <Text>Privacy Policy</Text>
      </Box>
      <Box textAlign={'start'}>
        <Heading fontSize={['md', 'lg']}>Get in touch</Heading>
        <Box display={'flex'}> 
          <Link href='https://twitter.com/RobotrustXYZ' padding={'5px'}>
            <FaTwitter size='1.5em' />
          </Link>
          <Link href='https://discord.gg/FKCGjY5acX' padding={'5px'}>
            <FaDiscord size='1.5em' />
          </Link>
        </Box>
      </Box>
    </Box>

    <Box className="footer-copyright">
      <Text>@2022 RoboTrust. All rights reserved.</Text>
    </Box>
  </Box>
);

export default Footer;