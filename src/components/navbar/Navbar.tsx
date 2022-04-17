import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ethers } from 'ethers';
import {
  Box,
  Link,
  Image,
  Button
} from '@chakra-ui/react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { accountState, connectButtonClickedState } from '../../state/atoms';
import logo from '../../assets/robotrust.png';
import metamaskIcon from '../../assets/metamask.svg';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [account, setAccount] = useRecoilState(accountState);
  const [connectButtonClicked, setConnectButtonClicked] = useRecoilState(connectButtonClickedState);
  
  const navigator = useNavigate();

  const connectWalletHandler = async () => { 
    // if no auto-login, show a connect wallet button to allow for connection to metamask.
    //await window.ethereum.enable()
    const provider: any = new ethers.providers.Web3Provider(window.ethereum);

    if (!provider) {
      alert("Please install Metamask!")
    }
  
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("Found an account! Address: ", accounts[0]);
      //await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log(`setting account... ${accounts[0]} (${signer})`);
      
      setAccount(accounts[0]);
      console.log('Account Set ###');
    } catch(err) {
      console.log(err);
    }
  }

  const ConnectedAccountInfo = () => {
    const slicedAddress = account != null ? account.slice(0, 5) + "..." + account.slice(-4) : '';
    return(
      <Box textColor={'white'} display={'flex'} justifyContent={'flex-end'} cursor={'pointer'} alignItems={'center'}>
        <Image src={metamaskIcon} alt="Metamask Icon" width={'3rem'} height={'3rem'} marginRight={'1rem'}/>
        {account != null 
         ? <p> {slicedAddress} </p>
         : <p> Please install Metamask! </p>
        }
      </Box>
    );
  }

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} padding={['2rem 2rem 0rem 2rem', '2rem 2rem 0rem 2rem', '5rem 9rem 0rem 8rem']}>
      <Box display={"block"} height={75}> 
        <Link onClick={(() => {
          navigator('/');
        })}>
          <Image height={75} src={logo} alt="logo" fit={'contain'} />
        </Link>
      </Box>
      <Box justifyContent={'flex-end'} flex={1} display={['none', 'none', 'flex']} paddingRight={'15'}>
        <Box display={['none', 'none', 'flex']} color={['green', 'white']} paddingRight={'15'}>
          <HashLink smooth to='/#about'>About</HashLink>
        </Box>
        {account != null ? <Link onClick={(() => {navigator('/profile')})} display={['none', 'none', 'flex']} color={['green', 'white']}>Profile</Link> : ''}
      </Box> 
      <Box display={['none', 'none', 'flex']}> 
        {account != null 
          ? <ConnectedAccountInfo />
          : <Button onClick={connectWalletHandler} cursor={'pointer'} 
              padding={'0.5rem 1rem'} textColor={'white'} bgColor={'#FFFFFF00'} fontSize={'18px'} display={['none', 'none', 'inherit']}
              border={'2px solid #F49867'} borderRadius={'5px'}> Connect your wallet </Button>
        }
      </Box> 
      <Box display={['flex', 'flex', 'none']} flexDirection={'column'} alignItems={'flex-end'} background={'var(--color-footer)'} borderRadius={'5px'}>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <Box className="navbar-menu-container scale-up-center" justifyContent={'flex-end'} display={'flex'} 
          alignItems={'flex-end'} textAlign={'end'} right={0} top={'40px'} padding={'1rem'}>
          <Box className="navbar-menu-links-container" lineHeight={'25px'} fontSize={'18px'}>
            <Box display={'flex'}> 
              {account != null 
                ? <ConnectedAccountInfo />
                : <Button onClick={connectWalletHandler} cursor={'pointer'} 
                    padding={'0.5rem 1rem'} textColor={'white'} bgColor={'#FFFFFF00'} fontSize={'18px'}
                    border={'2px solid #F49867'} borderRadius={'5px'}> Connect your wallet </Button>
              }
            </Box>
            <Box justifyContent={'flex-end'} flex={1} display={'flex'} marginTop={'10px'}>
              <Link href="#robotrust" color={'white'}>About</Link>
            </Box>
          </Box>
        </Box>
        )} 
      </Box>
    </Box> 
  ) 
}

export default Navbar;