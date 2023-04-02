/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Web3Context from "../contexts";

import Navbar from "../components/Navbar";

function Landing() {
  const { account, sellerI } = useContext(Web3Context);

  return (
    <>
      <div>
        <Navbar />
        <div className="w-full h-screen bg-black flex justify-center items-center">
          <div className="left w-1/2 ml-32">
            <div className="flex flex-col justify-start items-start">
              <div className="title font-bold text-4xl text-white ">
                On-Chain Warranties for Products
              </div>
              <div className="info mt-5 text-white">
                Free up your cupboard spaces and store your warranties in the
                digital world in the form of NFTs having proper ownership proof
                over it. Now the warranty is not a piece of paper but a form of
                token. Start issuing warranties for your products by registering
                below.
              </div>
              <div className="buttons w-full mt-8 flex justify-start items-center">
                {sellerI == 0 ? (
                  <NavLink
                    to="/createseller"
                    className="bg-new w-36 text-black p-2 text-center rounded-2xl"
                  >
                    Register as Seller
                  </NavLink>
                ) : (
                  <NavLink
                    to={`seller/${account.currentAccount}`}
                    className="bg-new w-32 text-black p-2 text-center rounded-2xl"
                  >
                    Seller
                  </NavLink>
                )}
                <NavLink
                  to={`/buyer/${account.currentAccount}`}
                  className="bg-new w-32 text-black p-2 ml-2 text-center rounded-2xl"
                >
                  Customer
                </NavLink>
              </div>
            </div>
          </div>
          <div className="right w-1/2 h-full flex justify-center items-center">
            <img
              className="w-96"
              src="https://iili.io/HOq4ohb.png"
              style={{ height: "50%", width: "55%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
