import { atom } from 'recoil';
import { ethers } from 'ethers';
import { CreateFormData, CreateCRUTData } from '../utils/createFormData';

export const accountState = atom({
    key: 'accountState',
    default: null as string | null
  });

export const connectButtonClickedState = atom({
  key: 'connectButtonClickedState',
  default: false
});

export const providerState = atom({
  key: 'providerState',
  default: null as ethers.providers.Provider | null
});

export const createTrustFormState = atom({
  key: 'createTrustFormState',
  default: new CreateFormData({})
});

export const createCRUTFormState = atom({
  key: 'createCRUTFormState',
  default: new CreateCRUTData({})
});