"use client";
import { Button, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@hanzo/ui/primitives";
import { useState, type FC } from "react";
import { LuxDataTable } from "./components/table";
import { useReadContract } from 'wagmi'
import abi_LUXSaleUtil  from '../Assets/abi/LUXSaleUtil.abi.json'
import abi_LUXSale from '../Assets/abi/LUXSale.abi.json'
import abi_LUXToken  from '../Assets/abi/LUXToken.abi.json'
import { formatUnits } from "viem";

interface Props {
  contractAddress: string;
  ethereumAddress: string;
  publicKey: string;
  tokenBalance: string;
}

export const MainLayout: FC<Props> = (props) => {
  const { contractAddress, ethereumAddress, publicKey, tokenBalance } = props;

  const [isGetEOSClicked, setGetEOSClicked] = useState(false);

  function getLuxSaleData() {
    const dailyTotals = useReadContract({
      abi: abi_LUXSaleUtil,
      functionName: 'dailyTotals',
      address: process.env.NEXT_PUBLIC_LUX_SALE_UTIL_ADDRESS_TESTNET as `0x${string}` | undefined,
      chainId: 8888,
    })
    return dailyTotals.data
  }
  function getUserBuys() {
    const userBuys = useReadContract({
      abi: abi_LUXSaleUtil,
      functionName: 'userBuys',
      address: process.env.NEXT_PUBLIC_LUX_SALE_UTIL_ADDRESS_TESTNET as `0x${string}` | undefined,
      chainId: 8888,
      args: [ethereumAddress as `0x${string}` | undefined],
    })
    return userBuys.data
  }
  function getStartTime(){
    const startTime = useReadContract({
      abi: abi_LUXSale,
      functionName: 'startTime',
      address: process.env.NEXT_PUBLIC_LUX_SALES_ADDRESS_TESTNET as `0x${string}` | undefined,
      chainId: 8888,
    })
    const timeStamp = Number(startTime.data)
    const date = new Date(timeStamp * 1000)
    return date.toLocaleString()
  }
  function createOnDay() {
    let createOndays = []
    for (let i = 0; i < 369; i++) {
      const onDay = useReadContract({
        abi: abi_LUXSale,
        functionName: 'createOnDay',
        address: process.env.NEXT_PUBLIC_LUX_SALES_ADDRESS_TESTNET as `0x${string}` | undefined,
        chainId: 8888,
        args: [i]
      })
      if (onDay.data && typeof onDay.data === 'bigint') {
        createOndays.push(Number(formatUnits(onDay.data, 18)))
      }
    }
    return createOndays
  }

  function dailyTotals() {
    let dailyTotals = []
    for(let i = 0; i < 369; i++) {
      const dailyTotal = useReadContract({
        abi: abi_LUXSale,
        functionName: 'dailyTotals',
        address: process.env.NEXT_PUBLIC_LUX_SALES_ADDRESS_TESTNET as `0x${string}` | undefined,
        chainId: 8888,
        args: [i]
      })
      if (dailyTotal.data && typeof dailyTotal.data === 'bigint') {
        dailyTotals.push(Number(formatUnits(dailyTotal.data, 18)))
      }else{
        dailyTotals.push(0)
      }
    }
    return dailyTotals
  }

  function getCurrentPrice(){
    let currentPrices = []
    for (let i = 0; i < 369; i++) {
      const currentPrice = useReadContract({
        abi: abi_LUXSale,
        functionName: 'getCurrentPriceFloor',
        address: process.env.NEXT_PUBLIC_LUX_SALES_ADDRESS_TESTNET as `0x${string}` | undefined,
        chainId: 8888,
        args: [i]
      })
      if (currentPrice.data && typeof currentPrice.data === 'bigint') {
        currentPrices.push(Number(formatUnits(currentPrice.data, 18)))
      }else{
        currentPrices.push(0)
      }
    }
    return currentPrices
  }

  console.log("LUX Sale Data", getLuxSaleData());
  console.log("User address", ethereumAddress);
  console.log("Get User Buys", getUserBuys());
  console.log("Get Start Time", getStartTime());
  console.log("Create On Day", createOnDay());
  console.log("Daily Totals", dailyTotals());
  console.log("Current Price", getCurrentPrice());
  return (
    <div className="w-full">
      {
        !isGetEOSClicked ?
          <div className="w-full px-4 bg-[#1b1b1b] mt-10 py-10">
            <h1 className="text-center text-white text-3xl mb-10">Token Distribution</h1>
            <div className="flex flex-col items-center xl:items-start xl:flex-row justify-between xl:justify-evenly">
              <div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-center text-xl text-[#747474]">Contract Address</div>
                  <span className="text-xl">{contractAddress}</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-center text-xl text-[#747474]">Ethereum Address</div>
                  <span className="text-xl">{ethereumAddress}</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-center text-xl text-[#747474]">public key</div >
                  <span className="text-xl">{publicKey}</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-center text-xl text-[#747474]">Token Balances</div>
                  <span className="text-xl">{tokenBalance} LUX</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button className="py-2 text-sm md:text-base border rounded-full w-[250px]" onClick={() => setGetEOSClicked(true)}>GET LUX TOKENS</Button>
                  <Button className="py-2 text-sm md:text-base border rounded-full w-[250px]">CHANGE YOUR KEY</Button>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button className="py-2 text-sm md:text-base border rounded-full w-[250px]" disabled>CLAIM LUX TOKENS</Button>
                  <Button className="py-2 text-sm md:text-base border rounded-full w-[250px]">TRANSFER LUX TOKENS</Button>
                </div>
              </div>
            </div>
          </div>
          :
          <div>
            <h1 className="text-left text-white text-2xl mt-10 mb-5">Get LUX Tokens</h1>
            <div className="w-full flex flex-col xl:flex-row gap-5">
              <div className="bg-[#1b1b1b] p-10 min-w-[600px]">
                <p className="text-left text-xl text-[#747474]">1. Select a distribution period to participate in</p>
                <p className="text-left text-xl text-[#747474]">2. Enter the amount of any currency to send</p>
                <p className="text-left text-xl text-[#747474]">3. Click <span className="text-white">Send</span></p>
                <p className="text-left text-xl text-[#747474]">4. Wait for Metamask to load</p>
                <p className="text-left text-xl text-[#747474]">5. Review the transaction on Metamask</p>
                <p className="text-left text-xl text-[#747474]">6. Click <span className="text-white">Submit</span> to submit transaction</p>
              </div>
              <div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="flex-none w-[200px] text-left text-xl text-[#747474]">Distribution period</div>
                  <Select>
                    <SelectTrigger className="w-[250px] rounded-none">
                      <SelectValue placeholder="Period #172" />
                    </SelectTrigger>
                    <SelectContent className="z-[100000] bg-[#000] opacity-100 text-white rounded-none">
                      <SelectGroup>
                        <SelectItem value="1">Period #172</SelectItem>
                        <SelectItem value="2">Period #173</SelectItem>
                        <SelectItem value="3">Period #174</SelectItem>
                        <SelectItem value="4">Period #175</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-left text-xl text-[#747474]">Closing</div>
                  <span className="text-xl">In 18 hours</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-left text-xl text-[#747474]">LUX Distributed</div>
                  <span className="text-xl">2,000,000,0000 LUX</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-left text-xl text-[#747474]">Total USD</div>
                  <span className="text-xl">660.83 USD</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-left text-xl text-[#747474]">Your USD</div>
                  <span className="text-xl">0.00 USD</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-left text-xl text-[#747474]">Effective price</div>
                  <span className="text-xl">0.000330419 USD/LUX</span>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-6 justify-start mb-3">
                  <div className="w-[200px] text-left text-xl text-[#747474] flex-none">Send</div>
                  <Input className="w-[250px] border-none bg-[#1b1b1b] rounded-none text-[#747474]" placeholder="0.00" />
                  <span>USD</span>
                  <Button className="py-2 px-4 text-sm md:text-base border rounded-full">Send</Button>
                </div>
              </div>
            </div>
          </div>
      }
      <LuxDataTable />
    </div>
  )
}