import * as CryptoJS from 'crypto-js';

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timeStamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.data === 'string' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.index === 'number' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.timeStamp === 'number';

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timeStamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timeStamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timeStamp = timeStamp;
  }
}

const genesisBlock: Block = new Block(
  1,
  'afklh3r23kjh55hl23khl32jlkyjl6l7k7jl',
  '',
  'Tori and Ginger',
  20210405
);

let blockChain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimeStamp
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.data,
    aBlock.timeStamp
  );

const isVaildBlock = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isVaildBlock(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
};

createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');
createNewBlock('fifth block');

console.log(blockChain);

export {};
