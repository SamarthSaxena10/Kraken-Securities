/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  getWarrantyDetails,
  resell,
} from '../contexts/useContract/readContract';
import Web3Context from '../contexts';

function Resell() {
  const { Contract, account } = useContext(Web3Context);
  const { warrantyID } = useParams();
  const [data, setData] = useState('');
  const [expiry, setExpiry] = useState('');

  // get Details of the product
  useEffect(() => {
    getDetails();
  }, [Contract]);
  const [to, setCustomer] = useState('');

  // get the details of the product warranty
  const getDetails = async () => {
    const res = await getWarrantyDetails(Contract, warrantyID);
    // console.log(res)
    setData(res);
    const date = new Date(res.expiry * 1000);
    setExpiry(date);
  };

  // handle the customer input
  const handleCustomer = (event) => {
    setCustomer(() => ([event.target.name] = event.target.value));
  };

  // resell the product
  const resell = async () => {
    const res = await resell(
      Contract,
      to,
      warrantyID,
      Math.round(warrantyID / 1000),
      account.currentAccount
    );
  };

  return (
    <>
      <div className="w-screen h-screen">
        <Navbar />
        <div className="w-full h-full bg-new-secondary flex flex-col justify-center items-center">
          <div className="w-1/3 h-4/6 flex justify-start items-center flex-col bg-secondary-3 rounded-lg border-2 border-black">
            <div className="text-2xl mt-4 font-bold">
              Warranty #{warrantyID}
            </div>
            <div className="flex flex-col justify-evenly items-center w-full h-3/4">
              <img
                className="w-auto rounded-lg p-0.5 h-2/3 mt-5 mb-5"
                src={data.imageURI}
              />
              <div className="flex flex-col justify-center items-center w-full text-center mt-4">
                <span className="w-full text-xl text-center">
                  <span className="font-semibold">Product ID:</span>{' '}
                  {data.productId}
                </span>
                <span className="w-full text-xl text-center">
                  <span className="font-semibold">Current Owner</span>{' '}
                  {`${String(data && data.buyers[data.buyers.length - 1]).slice(
                    0,
                    5
                  )}...${String(
                    data && data.buyers[data.buyers.length - 1]
                  ).slice(
                    String(data && data.buyers[data.buyers.length - 1]).length -
                      5
                  )}`}
                </span>
                <input
                  placeholder="Enter Buyer Wallet ID"
                  type="text"
                  className="w-2/3 m-4 p-2 rounded-lg"
                  onChange={handleCustomer}
                />
                <span className="w-full text-xl text-center">
                  <span className="font-semibold">Expiry Date:</span>
                  {data && String(expiry).slice(3, 25)}
                </span>
              </div>
            </div>
            {data && (data.status == 2 || data.status == 3) && (
              <a
                href={`https://testnets.opensea.io/assets/mumbai/0x356b61ae0f9c33461efae4fc184904a5f884f243/${data.tokenId}`}
                className="text-right mt-5 cursor-pointer underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                See at OpenSea
              </a>
            )}
          </div>
          <NavLink
            to={`/resell/${data.tokenId}`}
            className="w-1/3 h-10 flex justify-center items-center bg-new hover:bg-tertiary hover:text-black bottom-2 border-black rounded-xl text-black m-2"
          >
            Resell
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Resell;
