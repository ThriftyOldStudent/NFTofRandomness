import MetaMaskOnboarding from '@metamask/onboarding'

const ERC721ABI = [{
  'constant': true,
  'inputs': [{ 'name': 'tokenId', 'type': 'uint256' }],
  'name': 'ownerOf',
  'outputs': [{ 'name': 'owner', 'type': 'address' }],
  'type': 'function',
}]

const Web3 = require('web3')

const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
const textHead = document.getElementById('logo-text')
const textMore = document.getElementById('msg-more')
const image = document.getElementById('mm-logo')
const getAccountsResults = document.getElementById('getAccountsResult')
const ERC721ContractANFT = new web3.eth.Contract(ERC721ABI, '0x5bc94e9347f3b9be8415bdfd24af16666704e44f')
const ERC721ContractFCC = new web3.eth.Contract(ERC721ABI, '0x2d956093d27621ec0c4628b77eaeac6c734da02c')
const ERC721ContractBBNFT = new web3.eth.Contract(ERC721ABI, '0x43DB8ea81074b31Cf2665B600A4086cF36B59445')

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
      const ownerOfAddressANFT = await ERC721ContractANFT.methods.ownerOf('26403').call()
      const ownerOfAddressFCC = await ERC721ContractFCC.methods.ownerOf('3436').call()
      const ownerOfAddressBBNFT = await ERC721ContractBBNFT.methods.ownerOf('3310').call()
      const userAccount = _accounts[0]
      const checkANFT = await (userAccount.toLowerCase() === ownerOfAddressANFT.toLowerCase())
      const checkFCC = await (userAccount.toLowerCase() === ownerOfAddressFCC.toLowerCase())
      const checkBBNFT = await (userAccount.toLowerCase() === ownerOfAddressBBNFT.toLowerCase())
      console.log(`checkANFT: ${checkANFT}`)
      console.log(`checkFCC: ${checkFCC}`)
      console.log(`checkBBNFT: ${checkBBNFT}`)
      if (checkANFT) {
        textHead.innerHTML = '<p>You owned my Nativity NFT!</p><p>Thanks for your support!</p><p>May Baby Jesus bless you with greatness!!!</p>'
        textMore.innerHTML = '<p>I had received total of 0.95BAKE from your purchase.</p><p>Thank you for your generous support.</p><p><a href="https://github.com/ThriftyOldStudent/NFTofRandomness" target="_blank">You can find the source code of this webApp at github!</a></p>'
        image.style = 'width: 80%; margin-left: auto; margin-right: auto'
        image.src = 'respect.jpeg'
      } else if (checkFCC) {
        textHead.innerHTML = '<p>Are you serious?</p><p>Why you buy this NFT!</p>'
        textMore.innerHTML = '<p>Whatever is the reason, you are definately a whale!</p><p>Thank you for your generous support!</p><p>Now I\'m able to pay off my PHD tuition!</p><p><a href="https://github.com/ThriftyOldStudent/NFTofRandomness" target="_blank">You can find the source code of this webApp at github!</a></p>'
        image.style = 'width: 70%; margin-left: auto; margin-right: auto'
        image.src = 'why_meme.jpeg'
      } else if (checkBBNFT) {
        textHead.innerHTML = '<p>You owned my Chinese Peony NFT!</p><p>Thanks for your support!</p><p>Now you should learn more about the real NFT!!!</p>'
        textMore.innerHTML = '<p>It is a form of programmable unique asset!</p><p>Checkout the most basic implementation of this WebApp!</p><p><a href="https://github.com/ThriftyOldStudent/NFTofRandomness" target="_blank">You can find the source code of this webApp at github!</a></p>'
        image.style = 'width: 80%; margin-left: auto; margin-right: auto'
        image.src = 'respect.jpeg'
      } else {
        textHead.innerHTML = '<p>Hmmm, looks like you did not have The Thing!</p><p>Try again when you got That Thing!</p><p>If ya know what I mean...</p>'
        image.style = 'width: 80%; margin-left: auto; margin-right: auto'
        image.src = 'unimpressed.jpeg'
      }

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
