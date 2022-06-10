export const NFTCard = ({ nft }) => {
    const nftTitle = nft.title;
    const nftID = nft.id.tokenId;
    const nftAddress = nft.contract.address;
    return (
        <div className="lg:w-1/4 outline-2 bg-glass rounded-lg p-2">
            <img className="rounded-md object-contain " src={nft.media[0].gateway} alt="" />
            <center>
                <h3 className="py-3 px-2 text-xl mx-auto">{nftTitle}</h3>
            </center>
            <div>
                <h3 className="py-1 px-2 text-xl ">TokenID :- {nftID.slice(-4)}</h3>
            </div>
            <div>
                <h3 className="py-1 px-2 text-xs max-w-xl">{nftAddress}</h3>
            </div>
            <div>
                <h3 className="py-1 px-2 text-sm">{nft.description}</h3>
            </div>
        </div>
    )
}