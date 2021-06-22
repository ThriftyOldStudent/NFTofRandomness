import MetaMaskOnboarding from '@metamask/onboarding'

const textHead = document.getElementById('logo-text')
const image = document.getElementById('mm-logo')

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
      textHead.innerHTML = '<p>Hmmm, looks like you did not have The Thing!</p><p>That Thing is needed!</p><p>If ya know what I mean...</p>'
      image.style='width: 100%; margin-left: auto; margin-right: auto'
      image.src = 'unimpressed.jpeg'
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
