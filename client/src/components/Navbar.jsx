import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Web3Context from "../contexts";

function Navbar() {
  const { connectWallet, account } = useContext(Web3Context);

  return (
    <>
      <div
        className="w-full h-16 bg-new fixed flex flex-row justify-end items-center"
        style={{
          background:
            "linear-gradient(rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))",
        }}
      >
        <NavLink
          to="/"
          className="text-black text-2xl w-full pt-2 h-fit flex justify-start items-center py-2 ml-24 font-bold"
        >
          Kraken
        </NavLink>

        {account.currentAccount == null ? (
          <div
            className="mr-24 cursor-pointer text-black bg-secondary-2 w-52 h-10 text-center rounded-xl pt-2 px-4"
            onClick={connectWallet}
            style={{
              background:
                "linear-gradient(to right, rgb(29, 78, 216), rgb(30, 64, 175), rgb(17, 24, 39))",
            }}
          >
            Connect Wallet
          </div>
        ) : (
          <div className="w-1/3 flex justify-center items-center mr-24 text-black">
            Hey,{" "}
            {`${String(account.currentAccount).slice(0, 9)}...${String(
              account.currentAccount
            ).slice(String(account.currentAccount).length - 9)}`}
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
