import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil'
import App from './App';
import './index.css';

ReactDOM.render(
    <ChakraProvider>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </ChakraProvider>, 
    document.getElementById('root')); // render App JS in root html.
;