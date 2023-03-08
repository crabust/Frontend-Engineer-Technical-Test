import React, { useState, useEffect } from 'react';
import { getNftList, NFTInfo } from '../../utils/GetNftInfo';
import NftItem from '../common/NftItem';
const skeltonList = ['', '', '', '', ''];
const Landing = () => {
    const [nftList, setNftList] = useState<NFTInfo[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getNft = async () => {
            const data = await getNftList();
            setNftList(data);
        };
        setLoading(true);
        getNft();
        setLoading(false);
    }, []);

    return (
        <div className="pt-4 flex flex-col items-center text-white">
            <p className="font-bold text-[50px] pt-10 px-20 text-center">
                Frontend Engineer Technical Test
            </p>
            <div className="w-full flex flex-col items-center gap-[10px] mb-10">
                <p className="font-semibold text-[30px] text-special-red">
                    Anime Metaverse: Soulmates (AMS)
                </p>
            </div>
            <div className="px-20 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 pt-4 mb-10 w-full">
                {isLoading
                    ? skeltonList.map((item, index) => (
                        <NftItem key={index} item={item} />
                    ))
                    : nftList.map((item, index) => (
                        <NftItem item={item} key={index} />
                    ))}
            </div>
        </div>
    );
};

export default Landing;
