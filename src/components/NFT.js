import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import NftPlaceholder from './NftPlaceholder'

const NFTCard = ({ item, purchaseNFT, setNftDetail, nft, market, account }) => {
  const [image, setImage] = useState(null)
  const [itemData, setItemData] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)
  const [loading, setloading] = useState(false)
  const [detail, setDetail] = useState(null)
  const [nftOwner, setNftOwner] = useState(null)
  useEffect(() => {
    nftData()
  }, [])

  const nftData = async () => {
    setloading(true)
    const id = (item.tokenId).toString()
    const address = await nft.ownerOf(id)
    // console.log(address)
    setNftOwner(address)
    const uri = await nft.tokenURI(item.tokenId)
    try {
      const fetchData = await fetch(uri)
      const data = await fetchData.json()
      const totalPrice = (await market.getTotalPrice(item.itemId)).toString()
      setItemData(data)
      setTotalPrice(totalPrice)
      setImage(`https://${data.image.slice(7, 66)}.ipfs.dweb.link/blob`)
      setDetail({
        name: data.name,
        description: data.description,
        image: `https://${data.image.slice(7, 66)}.ipfs.dweb.link/blob`,
        seller: item.seller,
        price: totalPrice,
        tokenId: (item.tokenId).toString(),
        contractAddress: item.nft
      })
      // setDetail(items)
    } catch (error) {
      console.log('sample error : ' + error)
    }

    setloading(false)
  }
  const tokens = (n) => {
    return ethers.utils.formatEther(n)
  }

  return (
    <>
      {itemData && !loading ? <Card style={{ width: '18rem' }}>
        <Card.Img height={160} src={image}></Card.Img>
        <Card.Body>
          <span
            style={{
              marginTop: '-39px',
              marginLeft: '-17px',
              mask: 'url(/shape-avatar.svg) no-repeat center / contain',
              WebkitMask: 'url(/shape-avatar.svg) no-repeat center / contain',
              backgroundColor: 'white',
              display: 'inline-block',
              position: 'absolute',
              zIndex: 9,
              height: 40,
              width: 80
            }}><Image src='/avatars/avatar_1.jpg' style={{ width: '31px', height: '31px', borderRadius: '50%', marginLeft: '25px', marginTop: '5px' }} /></span>

          <Card.Title onClick={() => { setNftDetail(detail) }} style={{ cursor: 'pointer' }}>{itemData.name}</Card.Title>
          <Card.Text style={{ height: '45px' }}>{itemData.description.slice(0, 57)}...</Card.Text>

        </Card.Body>
        <ListGroup style={{ borderRadius: '0px', border: 'none' }}>
          <ListGroupItem><strong>Seller :</strong> {item.seller.slice(0, 5)}....{item.seller.slice(39, 42)}</ListGroupItem>

        </ListGroup>
        {!item.sold ? <Card.Footer style={{height:'54px'}}>
          {purchaseNFT && <>
            {account != item.seller ?
              <Button onClick={() => purchaseNFT(item.itemId, totalPrice)}>Buy</Button> :
              <Card.Text as='span'>Listed NFT</Card.Text>
            }
          </>}
          <Card.Text as='span' style={{ float: 'right' }}>{tokens(totalPrice)} ETH </Card.Text>
        </Card.Footer> :
          <Card.Footer>
            {nftOwner == account ? <>
              <Button>List For Sale</Button>
              <Card.Text as='span' style={{ float: 'right' }}>Item Sold </Card.Text>
            </> : <>
              <Button>Make Offer</Button>
              <Card.Text as='span' style={{ float: 'right' }}>Item Sold </Card.Text>
            </>}
          </Card.Footer>}
      </Card> : <NftPlaceholder />}
    </>
  )
}

export default NFTCard