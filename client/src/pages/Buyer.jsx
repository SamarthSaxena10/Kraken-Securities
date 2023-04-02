/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Web3Context from "../contexts";
import {
  buyerDetails,
  getWarrantyDetails,
} from "../contexts/useContract/readContract";

function Navbutton(props) {
  return (
    <a
      href={props.link}
      className="text-black hover:text-black text-lg w-5/6 h-fit py-4 mt-4 ml-11 hover:bg-new-secondary active:bg-new-secondary text-center pr-2 rounded-l-xl"
    >
      {props.content}
    </a>
  );
}

// count the number of warranties
function WarrantyCount(props) {
  return (
    <>
      <div className="w-1/4 cursor-default h-10 border-2 border-black bg-table-header flex justify-center items-center rounded-full">
        {props.head}: {props.count}
      </div>
    </>
  );
}

// function to display pending warranty requests
function PendingWarranty(props) {
  return (
    <>
      <NavLink
        to={`/Approve/${props.id}`}
        className="bg-table-data border-2 hover:border-black mx-16 h-14 flex justify-between items-center rounded-full text-xl my-2"
      >
        <div className="flex justify-center items-center pl-5">
          <img className="w-10 h-10 rounded-full" src={props.img} />
          <span className="px-3">{props.name}</span>
        </div>
        <span className="pr-12">{props.status}</span>
        <span className="pr-5">#{props.id}</span>
      </NavLink>
    </>
  );
}

// function to display active warranty requests
function ActiveWarranty(props) {
  return (
    <>
      <NavLink
        to={`/warranty/${props.id}`}
        className="bg-table-data border-2 hover:border-black mx-16 h-14 flex justify-between items-center rounded-full text-xl my-2"
      >
        <div className="flex justify-center items-center pl-5">
          <img className="w-10 h-10 rounded-full" src={props.img} />
          <span className="px-3">{props.name}</span>
        </div>
        <span className="pr-12">{props.status}</span>
        <span className="pr-12">{props.expiry}</span>
        <span className="pr-5">#{props.id}</span>
      </NavLink>
    </>
  );
}

// function to display expired warranty requests
function ExpiredWarranty(props) {
  return (
    <>
      <NavLink
        to={`/warranty/${props.id}`}
        className="bg-table-data border-2 hover:border-black mx-16 h-14 flex justify-between items-center rounded-full text-xl my-2"
      >
        <div className="flex justify-center items-center pl-5">
          <img className="w-10 h-10 rounded-full" src={props.img} />
          <span className="px-3">{props.name}</span>
        </div>
        <span className="pr-12">{props.status}</span>
        <span className="pr-5">#{props.id}</span>
      </NavLink>
    </>
  );
}

// main
function Seller() {
  const { connectWallet, account, Contract } = useContext(Web3Context);
  const { add } = useParams();
  const [nfts, setNfts] = useState([]);
  //console.log(account.currentAccount)
  useEffect(() => {
    // console.log(add)
    getData();
    // console.log(nfts);
  }, [Contract, add]);
  const getData = async () => {
    const res = await buyerDetails(Contract, add);
    // console.log(res)
    setNfts(res);
  };

  return (
    <>
      <div className="flex w-screen h-fit min-h-screen bg-new overflow-x-hidden mb-10">
        <div className="sidebar w-1/6 h-full flex flex-col items-end ">
          <NavLink
            to="/"
            className="text-black text-2xl border-b-2 p-4 w-full h-fit flex justify-center items-center font-bold"
          >
            Kraken
          </NavLink>

          <Navbutton className="text-white" link="#active" content="Active Warranties" />
          <Navbutton className="text-white" link="#pending" content="Pending Warranties" />
          <Navbutton className="text-white" link="#expired" content="Expired Warranties" />
          <div className="w-5/6 h-2/6 bg-new-secondary my-20 flex flex-col justify-center items-center rounded-2xl margin-3">
            <img
              className="w-1/2 mt-2 rounded-full"
              src="https://iili.io/HOqgacP.jpg"
            />
            <div className="text-xl mb-2  text-center font-semibold mt-2">
              Your Warranty Logs
            </div>
          </div>
        </div>
        <div className="main w-5/6 h-fit min-h-screen bg-buyer-background">
          <div className="flex justify-between bg-new items-center h-fit py-4">
            <span className="text-2xl ml-12 cursor-default text-black">
              My Warranties
            </span>
            {account.currentAccount == null ? (
              <div
                className="cursor-pointer text-black bg-secondary-2 mr-20 w-40 h-10 text-center rounded-xl pt-2"
                onClick={connectWallet}
              >
                Connect Wallet
              </div>
            ) : (
              <div className="mr-20 text-black">
                Hey,{" "}
                {`${String(account.currentAccount).slice(0, 9)}...${String(
                  account.currentAccount
                ).slice(String(account.currentAccount).length - 9)}`}
              </div>
            )}{" "}
          </div>
          {/* <div className="w-full h-1/6 flex  items-center justify-evenly my-4">
            <button className='w-1/4 bg-secondary-3'>Active Warranties: 23</button>
            <WarrantyCount head="Active Warranties" count="23" />
            <WarrantyCount head="Pending Warranties" count="23" />
            <WarrantyCount head="Expired Warranties" count="23" />
          </div> */}
          <div id="pending">
            <div className="text-xl pl-12 mt-10 mb-5 flex justify-evenly items-baseline">
              <div className="w-48 font-medium">Pending Warranty</div>
              <div className="w-5/6 h-px bg-black mr-20"></div>
            </div>
            <div className="text-xl flex justify-between border-2 border-black items-center bg-table-header mx-16 h-14 rounded-full my-2 px-7">
              <span className="font-bold">Your Wallet</span>
              <span className="font-bold">Status</span>
              <span className="font-bold">Token Id</span>
            </div>
            <div className="flex flex-col justify-evenly">
              {nfts.length &&
                nfts
                  .filter((res) => res.status == 0 || res.status == 1)
                  .map((obj) => {
                    const {
                      expiry,
                      status,
                      creationTime,
                      productId,
                      buyers,
                      imageURI,
                      tokenId,
                    } = obj;
                    console
                      .log
                      //tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                      ();

                    return (
                      <PendingWarranty
                        img={imageURI}
                        name={`${String(buyers[buyers.length - 1]).slice(
                          0,
                          5
                        )}...${String(buyers[buyers.length - 1]).slice(
                          String(buyers[buyers.length - 1]).length - 5
                        )}`}
                        status="Pending"
                        id={tokenId}
                      />
                    );
                  })}
            </div>
          </div>
          <div id="active">
            <div className="text-xl pl-12 mt-10 mb-5 flex justify-evenly items-baseline">
              <div className="w-40 font-medium">Active Warranty</div>
              <div className="w-5/6 h-px bg-black mr-20"></div>
            </div>
            <div className="text-xl flex justify-between items-center border-2 border-black bg-table-header mx-16 h-14 rounded-full my-2 px-7">
              <span className="font-bold">Your Wallet</span>
              <span className="font-bold">Status</span>
              <span className="font-bold">Expiry Date</span>
              <span className="font-bold">Token Id</span>
            </div>
            <div className="flex flex-col justify-evenly">
              {nfts.length &&
                nfts
                  .filter((res) => res.status == 2)
                  .map((obj) => {
                    const {
                      expiry,
                      status,
                      creationTime,
                      productId,
                      tokenId,
                      buyers,
                      imageURI,
                    } = obj;
                    //const date = new Date(expiry*1000);
                    var date = new Date(expiry * 1000);

                    return (
                      <ActiveWarranty
                        img={imageURI}
                        name={`${String(buyers[buyers.length - 1]).slice(
                          0,
                          5
                        )}...${String(buyers[buyers.length - 1]).slice(
                          String(buyers[buyers.length - 1]).length - 5
                        )}`}
                        status="Active"
                        id={tokenId}
                        expiry={String(date).slice(4, 25)}
                      />
                    );
                  })}
            </div>
          </div>
          <div id="expired">
            <div className="text-xl pl-12 mt-10 mb-5 flex  justify-evenly items-baseline">
              <div className="w-44 font-medium">Expired Warranty</div>
              <div className="w-5/6 h-px bg-black mr-20"></div>
            </div>
            <div className="text-xl flex justify-between border-2 border-black items-center bg-table-header mx-16 h-14 rounded-full my-2 px-7">
              <span className="font-bold">Your Wallet</span>
              <span className="font-bold">Status</span>
              <span className="font-bold">Token Id</span>
            </div>

            <div className="flex flex-col justify-evenly">
              {nfts.length &&
                nfts
                  .filter((res) => res.status == 3)
                  .map((obj) => {
                    const {
                      expiry,
                      status,
                      creationTime,
                      productId,
                      tokenId,
                      buyers,
                      imageURI,
                    } = obj;

                    return (
                      <ExpiredWarranty
                        img={imageURI}
                        name={`${String(buyers[buyers.length - 1]).slice(
                          0,
                          5
                        )}...${String(buyers[buyers.length - 1]).slice(
                          String(buyers[buyers.length - 1]).length - 5
                        )}`}
                        status="Expired"
                        id={tokenId}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Seller;
