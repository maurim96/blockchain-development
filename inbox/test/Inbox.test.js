const assert = require('assert');
// Local blockchain simulator
const ganache = require('ganache-cli');
// Constructor
const Web3 = require('web3');
// Instance
const web3 = new Web3(ganache.provider());
const  { interface, bytecode } = require('../compile');

const INITIAL_MESSAGE = 'Hello World!';
let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all acc's
  accounts = await web3.eth.getAccounts();

  // Use one of those acc's to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // Assert
    assert.ok(inbox.options.address);
  });

  it('has a default value', async () => {
    // Act
    const message = await inbox.methods.message().call();

    // Assert
    assert.equal(message, INITIAL_MESSAGE);
  });

  it('can update message', async () => {
    // Act
    await inbox.methods.setMessage('NewMessage').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();

    // Assert
    assert.equal(message, 'NewMessage');
  });
});