import MetaMaskOnboarding from '@metamask/onboarding'
// eslint-disable-next-line camelcase
// import { ethers } from 'ethers'

// let ethersProvider

const currentUrl = new URL(window.location.href)
const forwarderOrigin = currentUrl.hostname === 'localhost'
  ? 'http://localhost:9010'
  : undefined

const { isMetaMaskInstalled } = MetaMaskOnboarding
const onboardButton = document.getElementById('connectButton')

//const Web3 = require('web3')
// testnet
//const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

const initialize = () => {

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  //------Inserted Code------\\
  const MetaMaskClientCheck = () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      onboardButton.innerText = 'Click here to install MetaMask!';
      //When the button is clicked we call th is function
      onboardButton.onclick = onClickInstall;
      //The button is now disabled
      onboardButton.disabled = false;
    } else {
      //If MetaMask is installed we ask the user to connect to their wallet
      onboardButton.innerText = 'Connect';
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButton.onclick = onClickConnect;
      //The button is now disabled
      onboardButton.disabled = false;
    }
  };

  //We create a new MetaMask onboarding object to use in our app
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  //This will start the onboarding proccess
  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  };

  MetaMaskClientCheck();
  //------/Inserted Code------\\
};

window.addEventListener('DOMContentLoaded', initialize)