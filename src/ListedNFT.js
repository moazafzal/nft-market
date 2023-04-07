import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import NFTCard from './components/NFT'
import NFTDetail from './components/NFTDetail'
import Pages from './components/pages'
import Loading from './Loading'

const ListedNFT = ({ loading, purchaseNFT, nft, market , account}) => {
  
  const [nftData, setNftData] = useState(null)
  const [nftDetail, setNftDetail] = useState(null)
  
  useEffect(() => {
    loadNftData()
    window.ethereum.on('accountsChanged', loadNftData)
  }, [])

  const loadNftData = async () => {
    const itemCount = (await market.itemCount()).toString()
    const items = []
    for (let i = 1; i <= itemCount; i++) {    
        const item = await market.items(i)
        const id = (item.tokenId).toString()
        const address = await nft.ownerOf(id)
        if(account == item.seller)
        {
          items.push(item)
        }
    }
    setNftData(items)

  }
  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className='my-2 mx-2'>
        {nftDetail && <NFTDetail purchaseNFT={purchaseNFT}  setNftDetail={setNftDetail}  nftDetail={nftDetail} />}
      </div>
      <Row className='mx-3' >
        {
          nftData && nftData.map((e, index) => {
            return <Col key={index} className=' my-2' style={{maxWidth:'25%'}}>
              <NFTCard setNftDetail={setNftDetail} item={e} index={index + 1} purchaseNFT={purchaseNFT} nft={nft} market={market} />
            </Col>
          })
        }
      </Row>
      
    </>
  )
}

export default ListedNFT