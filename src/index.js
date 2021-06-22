import MetaMaskOnboarding from '@metamask/onboarding'
// eslint-disable-next-line camelcase
// import { ethers } from 'ethers'

// let ethersProvider

const currentUrl = new URL(window.location.href)
const forwarderOrigin = currentUrl.hostname === 'localhost'
  ? 'http://localhost:9010'
  : undefined

const onboardButton = document.getElementById('connectButton')

const initialize = () => {
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      onboardButton.innerText = 'Click here to install MetaMask!';
      onboardButton.onclick = onClickInstall;
      onboardButton.disabled = false;
    } else {
      onboardButton.innerText = 'Connect';
      onboardButton.onclick = onClickConnect;
      onboardButton.disabled = false;
    }
  };

  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  };

  MetaMaskClientCheck();
};

window.addEventListener('DOMContentLoaded', initialize)