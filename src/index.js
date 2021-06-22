import MetaMaskOnboarding from '@metamask/onboarding'
// eslint-disable-next-line camelcase
// import { ethers } from 'ethers'

// let ethersProvider

const currentUrl = new URL(window.location.href)
const forwarderOrigin = currentUrl.hostname === 'localhost'
  ? 'http://localhost:9010'
  : undefined

const { isMetaMaskInstalled } = MetaMaskOnboarding

// Dapp Status Section
const networkDiv = document.getElementById('network')
const chainIdDiv = document.getElementById('chainId')
const accountsDiv = document.getElementById('accounts')

// Basic Actions Section
const onboardButton = document.getElementById('connectButton')
const getAccountsButton = document.getElementById('getAccounts')
const getAccountsResults = document.getElementById('getAccountsResult')

// Permissions Actions Section
const requestPermissionsButton = document.getElementById('requestPermissions')
const getPermissionsButton = document.getElementById('getPermissions')
const permissionsResult = document.getElementById('permissionsResult')

// Contract Section
const deployButton = document.getElementById('deployButton')
const depositButton = document.getElementById('depositButton')
const withdrawButton = document.getElementById('withdrawButton')

// Send Eth Section
const sendButton = document.getElementById('sendButton')

// Send Tokens Section
// const tokenAddress = document.getElementById('tokenAddress')
const createToken = document.getElementById('createToken')
const watchAsset = document.getElementById('watchAsset')
const transferTokens = document.getElementById('transferTokens')
const approveTokens = document.getElementById('approveTokens')
const transferTokensWithoutGas = document.getElementById('transferTokensWithoutGas')
const approveTokensWithoutGas = document.getElementById('approveTokensWithoutGas')

// Encrypt / Decrypt Section
const getEncryptionKeyButton = document.getElementById('getEncryptionKeyButton')
const encryptMessageInput = document.getElementById('encryptMessageInput')
const encryptButton = document.getElementById('encryptButton')
const decryptButton = document.getElementById('decryptButton')
const encryptionKeyDisplay = document.getElementById('encryptionKeyDisplay')
const ciphertextDisplay = document.getElementById('ciphertextDisplay')
const cleartextDisplay = document.getElementById('cleartextDisplay')

// Ethereum Signature Section
const ethSign = document.getElementById('ethSign')
// const ethSignResult = document.getElementById('ethSignResult')
const personalSign = document.getElementById('personalSign')
// const personalSignResult = document.getElementById('personalSignResult')
const personalSignVerify = document.getElementById('personalSignVerify')
// const personalSignVerifySigUtilResult = document.getElementById('personalSignVerifySigUtilResult')
// const personalSignVerifyECRecoverResult = document.getElementById('personalSignVerifyECRecoverResult')
const signTypedData = document.getElementById('signTypedData')
// const signTypedDataResult = document.getElementById('signTypedDataResult')
const signTypedDataVerify = document.getElementById('signTypedDataVerify')
// const signTypedDataVerifyResult = document.getElementById('signTypedDataVerifyResult')
const signTypedDataV3 = document.getElementById('signTypedDataV3')
// const signTypedDataV3Result = document.getElementById('signTypedDataV3Result')
const signTypedDataV3Verify = document.getElementById('signTypedDataV3Verify')
// const signTypedDataV3VerifyResult = document.getElementById('signTypedDataV3VerifyResult')
const signTypedDataV4 = document.getElementById('signTypedDataV4')
// const signTypedDataV4Result = document.getElementById('signTypedDataV4Result')
const signTypedDataV4Verify = document.getElementById('signTypedDataV4Verify')
// const signTypedDataV4VerifyResult = document.getElementById('signTypedDataV4VerifyResult')

// Miscellaneous
const addEthereumChain = document.getElementById('addEthereumChain')

const Web3 = require('web3')
// testnet
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

const initialize = async () => {
  try {
    // We must specify the network as 'any' for ethers to allow network changes
    // ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    // hstFactory = new ethers.ContractFactory(
    //   hstAbi,
    //   hstBytecode,
    //   ethersProvider.getSigner(),
    // )
    // piggybankFactory = new ethers.ContractFactory(
    //   piggybankAbi,
    //   piggybankBytecode,
    //   ethersProvider.getSigner(),
    // )
  } catch (error) {
    console.error(error)
  }

  let onboarding
  try {
    onboarding = new MetaMaskOnboarding({ forwarderOrigin })
  } catch (error) {
    console.error(error)
  }

  let accounts
  let accountButtonsInitialized = false

  const accountButtons = [
    deployButton,
    depositButton,
    withdrawButton,
    sendButton,
    createToken,
    watchAsset,
    transferTokens,
    approveTokens,
    transferTokensWithoutGas,
    approveTokensWithoutGas,
    getEncryptionKeyButton,
    encryptMessageInput,
    encryptButton,
    decryptButton,
    ethSign,
    personalSign,
    personalSignVerify,
    signTypedData,
    signTypedDataVerify,
    signTypedDataV3,
    signTypedDataV3Verify,
    signTypedDataV4,
    signTypedDataV4Verify,
  ]

  const isMetaMaskConnected = () => accounts && accounts.length > 0

  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress'
    onboardButton.disabled = true
    onboarding.startOnboarding()
  }

  const onClickConnect = async () => {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      handleNewAccounts(newAccounts)
    } catch (error) {
      console.error(error)
    }
  }

  const clearTextDisplays = () => {
    encryptionKeyDisplay.innerText = ''
    encryptMessageInput.value = ''
    ciphertextDisplay.innerText = ''
    cleartextDisplay.innerText = ''
  }

  const updateButtons = () => {
    const accountButtonsDisabled = !isMetaMaskInstalled() || !isMetaMaskConnected()
    if (accountButtonsDisabled) {
      for (const button of accountButtons) {
        button.disabled = true
      }
      clearTextDisplays()
    } else {
      deployButton.disabled = false
      sendButton.disabled = false
      createToken.disabled = false
      personalSign.disabled = false
      signTypedData.disabled = false
      getEncryptionKeyButton.disabled = false
      ethSign.disabled = false
      personalSign.disabled = false
      signTypedData.disabled = false
      signTypedDataV3.disabled = false
      signTypedDataV4.disabled = false
    }

    if (isMetaMaskInstalled()) {
      addEthereumChain.disabled = false
    } else {
      onboardButton.innerText = 'Click here to install MetaMask!'
      onboardButton.onclick = onClickInstall
      onboardButton.disabled = false
    }

    if (isMetaMaskConnected()) {
      onboardButton.innerText = 'Connected'
      onboardButton.disabled = true
      if (onboarding) {
        onboarding.stopOnboarding()
      }
    } else {
      onboardButton.innerText = 'Connect'
      onboardButton.onclick = onClickConnect
      onboardButton.disabled = false
    }
  }

  // addEthereumChain.onclick = async () => {
  //   await ethereum.request({
  //     method: 'wallet_addEthereumChain',
  //     params: [{
  //       chainId: '0x64',
  //       rpcUrls: ['https://dai.poa.network'],
  //       chainName: 'xDAI Chain',
  //       nativeCurrency: { name: 'xDAI', decimals: 18, symbol: 'xDAI' },
  //       blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
  //     }],
  //   })
  // }

  const initializeAccountButtons = () => {

    if (accountButtonsInitialized) {
      return
    }
    accountButtonsInitialized = true

    /**
     * Permissions
     */

    requestPermissionsButton.onclick = async () => {
      try {
        const permissionsArray = await ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        })
        permissionsResult.innerHTML = getPermissionsDisplayString(permissionsArray)
      } catch (err) {
        console.error(err)
        permissionsResult.innerHTML = `Error: ${err.message}`
      }
    }

    getPermissionsButton.onclick = async () => {
      try {
        const permissionsArray = await ethereum.request({
          method: 'wallet_getPermissions',
        })
        permissionsResult.innerHTML = getPermissionsDisplayString(permissionsArray)
      } catch (err) {
        console.error(err)
        permissionsResult.innerHTML = `Error: ${err.message}`
      }
    }

    getAccountsButton.onclick = async () => {
      try {
        const _accounts = await ethereum.request({
          method: 'eth_accounts',
        })
        getAccountsResults.innerHTML = _accounts[0] || 'Not able to get accounts'
        web3.eth.getBalance(_accounts).then(console.log)
      } catch (err) {
        console.error(err)
        getAccountsResults.innerHTML = `Error: ${err.message}`
      }
    }
  }

  function handleNewAccounts (newAccounts) {
    accounts = newAccounts
    accountsDiv.innerHTML = accounts
    if (isMetaMaskConnected()) {
      initializeAccountButtons()
    }
    updateButtons()
  }

  function handleNewChain (chainId) {
    chainIdDiv.innerHTML = chainId
  }

  function handleNewNetwork (networkId) {
    networkDiv.innerHTML = networkId
  }

  async function getNetworkAndChainId () {
    try {
      const chainId = await ethereum.request({
        method: 'eth_chainId',
      })
      handleNewChain(chainId)

      const networkId = await ethereum.request({
        method: 'net_version',
      })
      handleNewNetwork(networkId)
    } catch (err) {
      console.error(err)
    }
  }

  updateButtons()

  if (isMetaMaskInstalled()) {

    ethereum.autoRefreshOnNetworkChange = false
    getNetworkAndChainId()

    ethereum.on('chainChanged', handleNewChain)
    ethereum.on('networkChanged', handleNewNetwork)
    ethereum.on('accountsChanged', handleNewAccounts)

    try {
      const newAccounts = await ethereum.request({
        method: 'eth_accounts',
      })
      handleNewAccounts(newAccounts)
    } catch (err) {
      console.error('Error on init when getting accounts', err)
    }
  }
}

window.addEventListener('DOMContentLoaded', initialize)

// utils

function getPermissionsDisplayString (permissionsArray) {
  if (permissionsArray.length === 0) {
    return 'No permissions found.'
  }
  const permissionNames = permissionsArray.map((perm) => perm.parentCapability)
  return permissionNames.reduce((acc, name) => `${acc}${name}, `, '').replace(/, $/u, '')
}

// function stringifiableToHex (value) {
//   return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)))
// }
