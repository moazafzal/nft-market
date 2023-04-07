import React, { useEffect, useState } from 'react'
import Sample from './Sample'

const SampleMarket = ({ nft, market }) => {

    const [nftData, setNftData] = useState(null)
    useEffect(() => {
        loadNftData()
    }, [])

    const loadNftData = async () => {
        const itemCount = (await market.itemCount()).toString()
        console.log(itemCount)
        const items = []
        for (let i = 1; i <= itemCount; i++) {
            if (i != 2) {
                const item = await market.items(i)
                items.push(item)
            }
        }
        setNftData(items)
    }
    return (
        <>
            {nftData && nftData.map((e,index) => {
                return <Sample key={index} item={e} nft={nft} market={market} index={index}/>
            })}
        </>
    )
}

export default SampleMarket