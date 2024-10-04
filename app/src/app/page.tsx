'use client';

import { useAccount, useBalance, useSwitchNetwork, useNetwork } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Input } from '@hanzo/ui/primitives';
import { useState } from 'react';

const tokenOptions = ['LETH', 'LBTC', 'LUSD', 'ZOO'];

const Home = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { data: balance } = useBalance({ address });
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [tokenAmount, setTokenAmount] = useState('');

  const handleTokenSelect = (token) => {
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
      <ConnectKitButton />
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
        <Select onValueChange={(value) => switchNetwork(Number(value))}>
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
    </div>
  );
};

export default Home;
