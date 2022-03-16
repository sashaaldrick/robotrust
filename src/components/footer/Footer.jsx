import React from 'react';
import { Box, Text, Heading, Image } from '@chakra-ui/react';
import logo from '../../assets/robotrust.png';
import './footer.css';

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
        <Text> 1650 Champa St., Denver, CO 80202 <br /> All Rights Reserved</Text>
      </Box>
      <Box className="footer-links-Box">
        <Heading fontSize={['md', 'lg']}>Links</Heading>
        <Text>Overons</Text>
        <Text>Social Media</Text>
        <Text>Counters</Text>
        <Text>Contact</Text>
      </Box>
      <Box className="footer-links-Box">
        <Heading fontSize={['md', 'lg']}>Company</Heading>
        <Text>Terms & Conditions </Text>
        <Text>Privacy Policy</Text>
        <Text>Contact</Text>
      </Box>
      <Box className="footer-links-Box">
        <Heading fontSize={['md', 'lg']}>Get in touch</Heading>
        <Text>1650 Champa St., Denver, CO 80202</Text>
        <Text>085-132567</Text>
        <Text>robot@robotrust.xyz</Text>
      </Box>
    </Box>

    <Box className="footer-copyright">
      <Text>@2022 RoboTrust. All rights reserved.</Text>
    </Box>
  </Box>
);

export default Footer;