# Simple dApp to interact with NFT owners

This is a simple dapp built according to https://github.com/MetaMask/test-dapp  
NFT is not just for artworks! It can be used to make more things happen!  
Thank you for supporting such technological greatness!  

![Are you serious?](https://raw.githubusercontent.com/ThriftyOldStudent/NFTofRandomness/main/src/serious.jpeg)  
![Nativity](https://raw.githubusercontent.com/ThriftyOldStudent/NFTofRandomness/main/src/nativity.jpeg)
## Usage

If you wish to use this dapp in your e2e tests, install this package and set up a script of e.g. the following form:

```shell
static-server node_modules/@Asvoria/test-dapp/dist --port 9011
```

## Development

### Requires Manual Deployment
If you change anything, run `npx prettier --write .` to make everything prettier.  
After merging or pushing to `main`, please run `yarn deploy` in the package root directory if the contents of the `dist/` directory have changed.