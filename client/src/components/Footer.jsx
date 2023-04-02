import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="w-full h-10 fixed bottom-0 bg-new flex justify-center items-center text-black"
        style={{
          background:
            "linear-gradient(to right, rgb(29, 78, 216), rgb(30, 64, 175), rgb(17, 24, 39))",
        }}
      >
        Made with ❤️ by Team Trailblazzer
      </div>
    </>
  );
};

export default Footer;
