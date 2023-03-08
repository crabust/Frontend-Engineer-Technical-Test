import axios from 'axios';
const moralisUrl = process.env.REACT_APP_MORALIS_API_URL;
const alchemyUrl = process.env.REACT_APP_ALCHEMY_API_URL;
const moralisKey = process.env.REACT_APP_MORALIS_API_KEY;
const chainId = process.env.REACT_APP_CHAIN_ID;
const nftAddress = process.env.REACT_APP_DEFAULT_NFT_ADDRESS;

interface CollectionInfo {
    contractAddress: string;
    tokenId: string;
    tokenType: string;
}

export interface NFTInfo {
    imgUrl: string;
    description: string;
    title: string;
    name: string;
    owner: string;
    contractAddress: string;
    tokenId: string;
}
export const getNftList = async (): Promise<NFTInfo[]> => {
    const url = `${moralisUrl}/${nftAddress}?chain=${chainId}&format=decimal&limit=50`;
    const nfts = await axios.get(url, {
        headers: {
            accept: 'application/json',
            'X-API-Key': moralisKey,
        },
    });
    const list: CollectionInfo[] = [];
    nfts.data.result.map((item: any) => {
        list.push({
            contractAddress: item.token_address,
            tokenId: item.token_id,
            tokenType: item.contract_type,
        });
    });

    const result = await axios.post(alchemyUrl as string, {
        tokens: list,
        refreshCache: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
    });

    const nftInfos: NFTInfo[] = [];
    result.data.map((item: any) => {
        nftInfos.push({
            imgUrl: item.media[0].gateway,
            description: item.description,
            title: item.title,
            name: item.contractMetadata.name,
            owner: item.contractMetadata.contractDeployer,
            contractAddress: item.contract.address,
            tokenId: item.id.tokenId,
        });
    });
    return nftInfos;
};
