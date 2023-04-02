const getSellerNFTs = async (contract, sellerId) => {
  if (!contract) {
    return false;
  }

  // getSellerNFTs
  const res = await contract.methods.getSellerNFTs(sellerId).call();
  return await Promise.all(
    res.map(async (_id) => {
      const {
        expiry,
        status,
        creationTime,
        productId,
        tokenId,
        buyers,
        tokenURI,
        imageURI,
      } = await contract.methods.getSellerWarrantyDetails(sellerId, _id).call();

      return {
        expiry,
        status,
        creationTime,
        productId,
        tokenId,
        buyers,
        tokenURI,
        imageURI,
      };
    })
  );
};

// sellerId
const sellerId = async (contract, address) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods.addressToSellerId(address).call();
  return res;
};

// warrantyDetails
const warrantyDetails = async (contract, address) => {
  if (!contract) {
    return false;
  }
  const tokens = await contract.methods.buyersCollection(address).call();
  //const articles = await contract.methods.getArticles().call();
  return await Promise.all(
    tokens.map(async (_id) => {
      let sellerId = Math.round(_id / 1000000);
      const { expiry, status, creationTime } = await contract.methods
        .sellerWarrantyDetails(sellerId)
        .call();

      return {
        expiry,
        status,
        creationTime,
      };
    })
  );
};

// getTokenDetails
const getTokenDetails = async (contract, tokenId) => {
  if (!contract) {
    return false;
  }

  const res = await contract.methods.tokenURI(tokenId).call();
  return res;
};

// getWarrantyDetails
const getWarrantyDetails = async (contract, tokenId) => {
  if (!contract) {
    return false;
  }
  let sellerId = Math.round(tokenId / 1000000);
  const res = await contract.methods
    .getSellerWarrantyDetails(sellerId, tokenId)
    .call();
  return res;
};

// buyerDetails
const buyerDetails = async (contract, address) => {
  if (!contract) {
    return false;
  }
  let arr = [];
  const length = await contract.methods.buyersCount(address).call();
  for (let index = 0; index < length; index++) {
    const res = await contract.methods.buyersCollection(address, index).call();
    let sellerId = Math.round(res / 1000000);
    const def = await contract.methods
      .getSellerWarrantyDetails(sellerId, res)
      .call();
    arr.push(def);
  }

  return arr;
};

export {
  getSellerNFTs,
  warrantyDetails,
  getTokenDetails,
  sellerId,
  getWarrantyDetails,
  buyerDetails,
};
