"use client"

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import moment from "moment";

// Define types for state
type Day = {
  createOnDay: bigint;
  dailyTotal: bigint;
  price: bigint;
  userBuys?: bigint;
  received?: bigint;
  ends?: moment.Moment;
  claimed?: boolean;
};

// Constants for contract addresses and time
const LUX_SALE = "0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf";
const LUX_SALE_UTIL = "0x860fd485f533b0348e413e65151f7ee993f93c02";
const LUX_TOKEN = "0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0";
const START_TIME = 1498914000;
const NUMBER_OF_DAYS = 350;
const WAD = 10n ** 18n;
const CREATE_FIRST_DAY = WAD * 20000000000n;
const CREATE_PER_DAY = WAD * 200000000n;

// Utility functions
const createOnDay = (day: number): bigint => (day === 0 ? CREATE_FIRST_DAY : CREATE_PER_DAY);
const dayFor = (timestamp: number): number => timestamp < START_TIME ? 0 : Math.floor((timestamp - START_TIME) / (23 * 60 * 60)) + 1;

const Home = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [ethBalance, setEthBalance] = useState<bigint | null>(null);
  const [luxBalance, setLuxBalance] = useState<bigint | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [unclaimed, setUnclaimed] = useState<bigint | null>(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const LUXSale = new ethers.Contract(LUX_SALE, LUX_SALE_ABI, signer);
      const LUXToken = new ethers.Contract(LUX_TOKEN, LUX_TOKEN_ABI, signer);

      const ethBalance = BigInt(await signer.getBalance());
      const luxBalance = BigInt(await LUXToken.balanceOf(await signer.getAddress()));

      const dailyTotals = await LUXSale.dailyTotals();
      const userBuys = await LUXSale.userBuys(await signer.getAddress());

      const daysData: Day[] = Array.from({ length: NUMBER_OF_DAYS + 1 }, (_, i) => {
        const createOnDayValue = createOnDay(i);
        const dailyTotal = BigInt(dailyTotals[i]);
        const price = dailyTotal ? dailyTotal / createOnDayValue : 0n;

        const received = userBuys[i]
          ? (createOnDayValue * BigInt(userBuys[i])) / dailyTotal
          : 0n;

        const ends = moment(START_TIME * 1000).add(23 * (i - 1), "hours");
        return {
          createOnDay: createOnDayValue,
          dailyTotal,
          price,
          userBuys: BigInt(userBuys[i]),
          received,
          ends,
          claimed: false, // Placeholder for claim logic
        };
      });

      setDays(daysData);
      setEthBalance(ethBalance);
      setLuxBalance(luxBalance);

      const unclaimedAmount = daysData
        .filter((day, i) => i < dayFor(Date.now() / 1000) && !day.claimed)
        .reduce((total, day) => total + (day.received || 0n), 0n);

      setUnclaimed(unclaimedAmount);
    };

    init();
  }, []);

  const handleBuy = async (amount: string) => {
    // Convert the amount to BigInt before sending
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const LUXSale = new ethers.Contract(LUX_SALE, LUX_SALE_ABI, signer);

    const buyAmount = BigInt(ethers.toBeHex(amount));
    await LUXSale.buy({ value: buyAmount });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Lux Token Distribution</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        {ethBalance && (
          <p className="text-lg">
            Ethereum Balance: {ethBalance / WAD} ETH
          </p>
        )}
        {luxBalance && (
          <p className="text-lg">
            Lux Balance: {luxBalance / WAD} LUX
          </p>
        )}
        {unclaimed && (
          <p className="text-lg">
            Unclaimed LUX: {unclaimed / WAD}
          </p>
        )}

        <h2 className="text-xl font-semibold mt-6">Available Days</h2>
        <div className="mt-4">
          {days.map((day, i) => (
            <div key={i} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
              <p>Day #{i}</p>
              <p>LUX Distributed: {day.createOnDay / WAD}</p>
              <p>Daily Total: {day.dailyTotal / WAD} ETH</p>
              <p>Price: {day.price ? day.price.toString() : "N/A"} ETH/LUX</p>
              {day.received && (
                <p>Received: {day.received / WAD} LUX</p>
              )}
              <p>Ending in: {day.ends?.fromNow()}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700"
            onClick={() => handleBuy("1")}
          >
            Buy 1 ETH worth of LUX
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
