import React, { useRef, useEffect } from 'react';
import { NFTInfo } from '../../utils/GetNftInfo';
const BuyNftModal = ({
    setModalVisible,
    item,
}: {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    item: NFTInfo;
}) => {
    const wrappedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('mousedown', (e: MouseEvent) => {
            if (
                wrappedRef.current &&
                !wrappedRef.current.contains(e.target as any)
            )
                setModalVisible(false);
        });
    }, [setModalVisible]);

    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center z-20 backdrop-blur-sm">
            <div
                ref={wrappedRef}
                className="bg-basic-dark max-w-[900px] w-full p-4 rounded-[20px]"
            >
                <p className="text-special-red text-[48px] font-bold leading-[100px] text-center">
                    {item.title}
                </p>
                <div className="flex md:flex-row flex-col items-center">
                    <div className="p-4 md:w-7/12 sm:max-w-none max-w-[400px] w-[80%]">
                        <img
                            className="w-full object-cover rounded-[10px]"
                            alt=""
                            src={item.imgUrl}
                        />
                    </div>
                    <div className="mx-3 md:w-5/12 w-full flex flex-col items-center">
                        <div>
                            <p className="sm:text-base text-sm text-white sm:leading-[28px] leading-7 text-left">
                                <span className="text-[20px]">Description</span>{' '}
                                <br />
                                {item.description}
                            </p>
                            <p className="mt-3 sm:text-base text-sm text-white sm:leading-[28px] leading-7 text-left">
                                <span className="text-[20px]">Owned By : </span>{' '}
                                <a
                                    href={`https://etherscan.io/address/${item.owner}`}
                                    target="_blank"
                                    className="text-special-red hover:text-white hover:underline"
                                >
                                    {item.owner}
                                </a>
                            </p>
                            <a
                                href={`https://opensea.io/assets/ethereum/${item.contractAddress}/${item.tokenId}`}
                                target="_blank"
                                className="mt-8 py-1.5 w-full h-full border-2 border-special-red text-xl font-bold rounded-full text-center flex justify-center items-center bg-special-red hover:bg-white hover:text-special-red text-white"
                            >
                                BUY
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyNftModal;
