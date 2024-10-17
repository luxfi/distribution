'use client';

import { useAccount, useBalance, useSwitchChain } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Input } from '@hanzo/ui/primitives';
import { useState } from 'react';
import { logo } from './Assets/Icons';
import LuxLogo from './Assets/Icons/lux-logo';
import Link from 'next/link';
import { MainLayout } from './layout/main';
import { formatUnits } from 'viem';

const tokenOptions = ['LETH', 'LBTC', 'LUSD', 'ZOO'];
const tokenDecimals = 18;

const contractAddress = process.env.NEXT_PUBLIC_LUX_TOKEN_ADDRESS_TESTNET;
let ethereumAddress = "Connect your Wallet first";
let publicKey = "Connect your Wallet first";
let tokenBalance = "Connect your Wallet first";

const Home = () => {
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [tokenAmount, setTokenAmount] = useState('');

  if(address){
    ethereumAddress = address;
    publicKey = address;
    const realTokenBalance  = formatUnits(balance?.value ?? BigInt(0), tokenDecimals);
    tokenBalance =realTokenBalance;
  }
  const handleTokenSelect = (token: string) => {
    setSelectedToken(token);
  };
  const handleBuyTokens = async () => {
    if (!address) return alert('Connect your wallet first');
    // Logic to handle token purchase
    console.log(`Buying ${tokenAmount} ${selectedToken}`);
  };

  const handleGetFaucetTokens = () => {
    if (chain?.id === 8888 || chain?.id === 1111) {
      // Logic for getting testnet tokens or chaosnet tokens
      alert('You have received free test tokens.');
    } else {
      alert('Faucet available only on testnet or chaosnet');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white flex flex-col items-center">
      <div className='flex justify-between items-center w-full'>
        <span className='inline-block font-bold font-heading cursor-default lg:text-3xl md:text-[1.8rem]/[1.8rem] tracking-tighter sm:text-lg text-base xl:text-3xl'>LUX</span>
        <ConnectKitButton showBalance={true} />
      </div>
      <Link href="https://bridge.lux.network" target="_blank" className='mt-10 rounded-2xl border w-72 h-10 flex items-center justify-between px-5'>
        <span className='inline-block font-bold font-heading cursor-default text-muted'>No Tokens?</span>
        <span className='inline-block font-bold font-heading cursor-default '> Use Lux Bridge</span>
      </Link>
      <MainLayout
        contractAddress={contractAddress || ''}
        ethereumAddress={ethereumAddress}
        publicKey={publicKey}
        tokenBalance={tokenBalance}
      />
      {/* <div className='mt-10 bg-muted w-full'>
        <h1 className="text-3xl font-bold mb-8">Lux Token Distribution</h1>

        {isConnecting && <p>Connecting...</p>}
        {isDisconnected && <p>Disconnected</p>}

        {address && chain && (
          <div>
            <p>
              Connected to <strong>{chain.name}</strong>
            </p>
            <p>Your address: {address}</p>
            <p>Your balance: {balance?.formatted} {balance?.symbol}</p>
          </div>
        )}

        <div className="mt-6">
          <label>Select Network:</label>
          <Select onValueChange={(value) => switchChain({ chainId: Number(value) })}>
            <SelectTrigger>
              <SelectValue placeholder={chain?.name ?? 'Select Network'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7777">Lux Mainnet</SelectItem>
              <SelectItem value="8888">Lux Testnet</SelectItem>
              <SelectItem value="9999">Lux Devnet</SelectItem>
              <SelectItem value="1111">Lux Chaosnet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <label>Select Token:</label>
          <Select onValueChange={handleTokenSelect}>
            <SelectTrigger>
              <SelectValue placeholder={selectedToken} />
            </SelectTrigger>
            <SelectContent>
              {tokenOptions.map((token) => (
                <SelectItem key={token} value={token}>
                  {token}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <Input
            type="text"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            placeholder={`Enter amount of ${selectedToken}`}
          />
          <Button onClick={handleBuyTokens} className="bg-green-600 ml-2">
            Buy Tokens
          </Button>
        </div>

        {chain?.id === 8888 || chain?.id === 1111 ? (
          <div className="mt-6">
            <Button onClick={handleGetFaucetTokens} className="bg-blue-600">
              Get Testnet Tokens
            </Button>
          </div>
        ) : null}
      </div> */}
    </div>
  );

};export default Home;
