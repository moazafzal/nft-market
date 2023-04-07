import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Col, Pagination, Row } from 'react-bootstrap'
// import NFTCard from './components/NFT'
import NFTDetail from './components/NFTDetail'
import Pages from './components/pages'
import Loading from './Loading'
const NFTCard = lazy(() => import('./components/NFT'))

const NftMarketPlace = ({ purchaseNFT, nft, market, purchaseLoading, setPurchaseLoading ,account}) => {
  const [nftData, setNftData] = useState(null)
  const [nftDetail, setNftDetail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(null)
  const [activePage, setActivePage] = useState(1)
  useEffect(() => {
    loadNftData()
  }, [])



  useEffect(() => {
    if (purchaseLoading) {
      loadNftData()
      setPurchaseLoading(false)
    }
  }, [purchaseLoading])

  const loadNftData = async () => {
    setLoading(true)
    const itemCount = (await market.itemCount()).toString()
    
    const items = []
    for (let i = 1; i <= itemCount; i++) {

      const item = await market.items(i)
      // console.log(item.sold)
      if (!item.sold) {
        items.push(item)
      }
    }
    // console.log(items.length)
    // items.forEach(element => {
    //   console.log('item sold : ' + element.sold)
    // });
    setNftData(items)
    setLoading(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className='my-2 mx-2'>
        {nftDetail && <NFTDetail purchaseNFT={purchaseNFT} setNftDetail={setNftDetail} nftDetail={nftDetail} account={account}/>}
      </div>
      <Row className='mx-3' >
        {
          nftData && nftData.map((e, index) => {
            return <Suspense key={index+Math.random()}>
                  <Col key={index} className=' my-2' style={{ maxWidth: '25%' }}>
                    <NFTCard  setNftDetail={setNftDetail} item={e} index={index + 1} purchaseNFT={purchaseNFT} nft={nft} market={market} account={account}/>
                  </Col>
                </Suspense>
          })
        }
      </Row>
      
    </>
  )
}

export default NftMarketPlace