import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import BuyNftModal from './BuyNftModal';
import { NFTInfo } from '../../utils/GetNftInfo';

import 'react-loading-skeleton/dist/skeleton.css';
const NftItem = ({ item }: { item: NFTInfo | string }) => {
    const [buyNftModalVisible, setBuyNftModalVisible] = useState(false);
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const onBuyBtnClicked = () => {
        setBuyNftModalVisible(true);
    };

    return (
        <>
            {buyNftModalVisible ? (
                <BuyNftModal
                    setModalVisible={setBuyNftModalVisible}
                    item={item as NFTInfo}
                />
            ) : (
                <></>
            )}
            <div className="relative w-full aspect-[244/360] rounded-xl cursor-pointer overflow-hidden">
                {typeof item === 'string' ? (
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton className="h-full" />
                    </SkeletonTheme>
                ) : (
                    <>
                        {!isImgLoaded ? (
                            <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                            >
                                <Skeleton className="h-full" />
                            </SkeletonTheme>
                        ) : (
                            <></>
                        )}
                        <div
                            className={`${!isImgLoaded ? 'hidden' : ''
                                } h-full w-full`}
                        >
                            <img
                                className="w-full h-full object-cover rounded-xl transition-all duration-500 hover:scale-110"
                                src={item.imgUrl}
                                alt=""
                                onClick={onBuyBtnClicked}
                                onLoad={() => setIsImgLoaded(true)}
                            />
                            <div className="absolute w-full top-0 p-2.5 rounded-[10px] bottom-0 h-1/4 bg-gradient-to-b to-transparent from-[#333]">
                                <p className="text-base text-white font-medium">
                                    <i>{item.title}</i>
                                </p>
                                <p className="text-sm text-white font-light">
                                    {item.name}
                                </p>
                            </div>
                            <div className="absolute rounded-[10px] w-full bottom-0 h-1/4 bg-gradient-to-b from-transparent to-black">
                                <div className="h-full flex flex-col justify-end">
                                    <div className="flex gap-2 w-10/12 justify-center mx-auto max-h-14 h-1/3">
                                        <a
                                            href={`https://opensea.io/assets/ethereum/${item.contractAddress}/${item.tokenId}`}
                                            target="_blank"
                                            className="w-full max-w-[200px] h-full border-2 border-special-red  text-xl font-bold rounded-full text-center flex gap-2 justify-center items-center bg-special-red hover:bg-white hover:text-special-red text-white"
                                        >
                                            BUY
                                        </a>
                                    </div>
                                    <div className="h-1/4"></div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default NftItem;
