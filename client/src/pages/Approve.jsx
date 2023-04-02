/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getWarrantyDetails } from '../contexts/useContract/readContract';
import { verify, claim } from '../contexts/useContract/writeContract';
import Web3Context from '../contexts';

function Warranty() {
  const { Contract, account } = useContext(Web3Context);
  const { warrantyID } = useParams();
  const [data, setData] = useState('');
  const [expiry, setExpiry] = useState('');

  // get Details of the product
  useEffect(() => {
    getDetails();
  }, [Contract]);

  const getDetails = async () => {
    // get the details of the product warranty
    const res = await getWarrantyDetails(Contract, warrantyID);
    //console.log(res.verifyHash)
    setData(res);
    //console.log(data.productId,account.currentAccount)
    // console.log(res.status)
    const date = new Date(res.expiry * 1000);
    setExpiry(date);
  };
  const verifying = async () => {
    const res = await verify(
      Contract,
      account.currentAccount,
      data.productId,
      Math.round(warrantyID / 1000000),
      warrantyID
    );
    if (res) {
      alert('You are verified');
      window.location.reload(false);
    } else {
      alert('Verification Failed');
      window.location.reload(false);
    }
  };

  // claim the warranty NFT
  const claiming = async () => {
    await claim(
      Contract,
      account.currentAccount,
      Math.round(warrantyID / 1000000),
      warrantyID
    );
    setTimeout(function () {
      window.location.href = `/buyer/${account.currentAccount}`;
    }, 4000);
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
              <div className="flex flex-col justify-center items-center mt-4">
                <span className="w-full text-xl text-left">
                  <span className="font-semibold">Product ID:</span>{' '}
                  {data.productId}
                </span>
                <span className="w-full text-xl text-left">
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
                <span className="w-full text-xl text-left">
                  <span className="font-semibold">Expiry Date:</span>
                  {data && String(expiry).slice(3, 25)}
                </span>
              </div>
            </div>
          </div>
          {data && data.status == 0 ? (
            <button
              className="w-1/3 h-10 bg-new hover:bg-tertiary hover:text-black bottom-2 border-black rounded-xl text-black m-2"
              onClick={verifying}
            >
              Verify Ownership
            </button>
          ) : (
            <button
              className="w-1/3 h-10 bg-new hover:bg-tertiary hover:text-black bottom-2 border-black rounded-xl text-black m-2"
              onClick={claiming}
            >
              Claim Warranty NFT
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Warranty;
