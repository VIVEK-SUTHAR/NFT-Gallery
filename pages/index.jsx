import { useState } from "react";
import { NFTCard } from "../components/NFTCard";

const Home = () => {
  const [WalletAddres, setWalletAddres] = useState("");
  const [collection, setCollection] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const fetchNFT = async () => {
    let nfts;
    // console.log("fetching nfts");
    const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: 'GET'
    };

    if (!collection.length) {

      const fetchURL = `${baseURL}?owner=${WalletAddres}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      // console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      // console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        // console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <h1 className="text-4xl my-4 text-white">NFT Gallery</h1>
      <div className="flex flex-col  w-screen  justify-center items-center gap-y-2  p-10 rounded-xl">
        <input
          className="outline-none border-none p-2 bg-glass rounded-lg text-black lg:w-96 md:w-80 sm:w-screen placeholder-zinc-900"
          disabled={fetchForCollection}
          type={"text"}
          value={WalletAddres}
          onChange={(e) => setWalletAddres(e.target.value)}
          placeholder="Add your wallet address"></input>
        <input
          className="outline-none border-none p-2 bg-glass rounded-lg text-black lg:w-96 md:w-80 placeholder-zinc-900"
          type={"text"}
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          placeholder="Add the collection address"></input>
        <label className="text-gray-900 accent-orange-500 "><input
          onChange={(e) => { setFetchForCollection(e.target.checked) }}
          type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button
          className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-xl lg:w-1/5  gr text-2xl text-slate"}
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else fetchNFT()
          }
          }
        >Let's go! </button>
      </div>
      <div className='flex flex-wrap flex-col lg:flex-row gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs && NFTs.map(nft => {
            return (
              <NFTCard nft={nft} />
            )
          })
        }
      </div>  
    </div>
  )
}

export default Home
