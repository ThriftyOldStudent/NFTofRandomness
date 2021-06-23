import MetaMaskOnboarding from '@metamask/onboarding'

const ERC721ABI = [
  // ownerOf
  {
    'constant' : true,
    'inputs' : [{ 'name':'tokenId', 'type':'uint256' }],
    'name' : 'ownerOf',
    'outputs' : [{ 'name':'owner', 'type':'address' }],
    'type' : 'function'
  }
];

const Web3 = require('web3')

const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
const textHead = document.getElementById('logo-text')
const image = document.getElementById('mm-logo')
const getAccountsResults = document.getElementById('getAccountsResult')
const ERC721Contract = new web3.eth.Contract(ERC721ABI, '0x5bc94e9347f3b9be8415bdfd24af16666704e44f')

const currentUrl = new URL(window.location.href)
const forwarderOrigin = currentUrl.hostname === 'localhost'
  ? 'http://localhost:9010'
  : undefined

const onboardButton = document.getElementById('connectButton')

const initialize = () => {
  const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      })
      getAccountsResults.innerHTML = _accounts[0] || 'Not able to get accounts'

      textHead.innerHTML = '<p>Hmmm, looks like you did not have The Thing!</p><p>Try again when you got That Thing!</p><p>If ya know what I mean...</p>'
      image.style = 'width: 80%; margin-left: auto; margin-right: auto'
      image.src = 'unimpressed.jpeg'
      const balanceValue = web3.eth.getBalance(_accounts[0]).then(console.log(_accounts[0]))
      console.log('balanceValue: ')
      console.log(balanceValue)
      const ownerOfAddress = await ERC721Contract.methods.ownerOf('26403').call() // get the owner of the NFT
      console.log('ownerOfAddress: ')
      console.log(ownerOfAddress)

    } catch (error) {
      console.error(error)
    }
  }
  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress'
    onboardButton.disabled = true
    onboarding.startOnboarding()
  }

  const MetaMaskClientCheck = () => {
    if (isMetaMaskInstalled()) {
      onboardButton.innerText = 'Connect'
      onboardButton.onclick = onClickConnect
      onboardButton.disabled = false
    } else {
      onboardButton.innerText = 'Click here to install MetaMask!'
      onboardButton.onclick = onClickInstall
      onboardButton.disabled = false
    }
  }

  MetaMaskClientCheck()
}

window.addEventListener('DOMContentLoaded', initialize)
