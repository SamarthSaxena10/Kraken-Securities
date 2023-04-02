/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Web3Context from '../contexts';
import { createSeller } from '../contexts/useContract/writeContract';
import Navbar from '../components/Navbar';

function CreateSeller() {
  const [sellerId, setSellerId] = useState('');
  const history = useNavigate();
  const { account, Contract } = useContext(Web3Context);

  // set the seller id
  useEffect(() => {
    const rand = Math.round(Math.random() * 100000);
    setSellerId(rand);
  }, []);

  // create the seller profile
  const create = async () => {
    //console.log(Contract)
    await createSeller(sellerId, Contract, account.currentAccount);
    window.location.href = `seller/${account.currentAccount}`;
  };

  return (
    <>
      <div className="w-screen h-screen">
        <Navbar />
        <div
          className="w-full h-full flex justify-evenly items-center"
          style={{ backgroundColor: '#d4d8f0' }}
        >
          <div
            className="w-2/4 h-1/2 drop-shadow rounded-lg flex flex-col justify-evenly items-center"
            style={{ backgroundColor: '#232946' }}
          >
            <div className="text-xl text-black font-bold">
              Create Seller Profile
            </div>
            <form className="w-full h-1/2 flex flex-col justify-evenly items-center">
              <div className="w-full flex flex-col justify-evenly items-center">
                <label
                  htmlFor="wallet"
                  className="w-2/4 p-2 text-black text-left"
                >
                  Seller Wallet Address
                </label>
                <input
                  name="wallet"
                  placeholder="Enter Seller Wallet ID"
                  type="text"
                  className="w-2/4 p-2 rounded-md"
                  readOnly
                  value={
                    account.currentAccount ? account.currentAccount : '0x00'
                  }
                />
              </div>
              <div className="w-full flex flex-col justify-evenly items-center">
                <label
                  htmlFor="seller"
                  className="w-2/4 p-2 text-black text-left"
                >
                  Seller ID
                </label>
                <input
                  name="seller"
                  placeholder="Enter Seller ID"
                  type="text"
                  className="w-2/4 p-2 rounded-md"
                  readOnly
                  value={sellerId}
                />
              </div>
            </form>
            <button
              className="w-1/3 h-12 flex justify-center items-center font-semibold rounded-md"
              style={{ backgroundColor: '#eebbc3', color: '#232946' }}
              onClick={create}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSeller;
