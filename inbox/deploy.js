const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'spread debate phone lemon amused game hair swear pretty useless injury ensure',
  'https://rinkeby.infura.io/v3/bd298615bd524f6ab8d5d3fc858a3252'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['First Msg!'] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to: ', result.options.address);

    provider.engine.stop();
};

deploy();
