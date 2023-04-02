/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';

import { NavLink, useParams } from 'react-router-dom';
import { getWarrantyDetails } from '../contexts/useContract/readContract';
import Web3Context from '../contexts';

function History() {
  const { Contract } = useContext(Web3Context);
  const { warrantyID } = useParams();
  const [data, setData] = useState('');
  const [expiry, setExpiry] = useState('');
  useEffect(() => {
    getDetails();
  }, [Contract]);

  // get Details of the product
  const getDetails = async () => {
    const res = await getWarrantyDetails(Contract, warrantyID);
    // console.log(res)
    setData(res);
    const date = new Date(res.expiry * 1000);
    setExpiry(date);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen bg-new-secondary flex justify-center items-center">
        <div className="w-1/2 h-1/2 text-black flex flex-col justify-start  items-center bg-secondary-3 rounded-xl">
          <div className="text-3xl">History</div>
          <div className="text-xl flex justify-evenly items-center bg-table-header w-5/6 py-2 m-5 rounded-2xl">
            <div>Owner Wallet</div>
            <div>Purchase Date</div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="mr-10 flex flex-col justify-around items-center">
              {data &&
                data.buyers &&
                data.buyers.map((dat) => (
                  <div>
                    {String(dat).slice(0, 9)}...
                    {String(dat).slice(String(dat).length - 9)}
                  </div>
                ))}
            </div>
            <div className="flex flex-col justify-between items-center">
              {data &&
                data.buyersDate &&
                data.buyersDate.map((dat) => {
                  const date = new Date(dat * 1000);
                  //console.log(dat)
                  return <div>{String(date).slice(4, 25)}</div>;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
