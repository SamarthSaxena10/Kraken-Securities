/* eslint-disable */
import React, { useState } from 'react';
import NFTWarranty from '../contracts/NFTWarranty.json';
import { Web3Context } from './index';
import Web3 from 'web3';
import { sellerId } from './useContract/readContract';

const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState({
    accounts: null,
    currentAccount: null,
  });
  const [Contract, setContract] = useState('');
  const [sellerI, setSellerId] = useState(0);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      // console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      // console.log('We have the ethereum object');
    }
    var web3 = new Web3(window.ethereum);

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chain = await web3.eth.getChainId();
    setAccount({
      accounts: accounts,
      currentAccount: accounts[0],
    });

    if (accounts.length !== 0) {
      getContract(chain, accounts);
    } else {
      console.log('No authorized account found');
    }
  };
  const getContract = (chain, accounts) => {
    var web3 = new Web3(window.ethereum);

    const deployedNetwork = NFTWarranty.networks[chain];

    const instance = new web3.eth.Contract(
      NFTWarranty.abi,
      deployedNetwork && deployedNetwork.address
    );

    setContract(instance);
    seller(instance, accounts[0]);
  };

  const seller = async (Contract, acc) => {
    const res = await sellerId(Contract, acc);
    setSellerId(res);
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnected,
        account,
        Contract,
        sellerI,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
