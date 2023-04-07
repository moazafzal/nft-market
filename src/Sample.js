import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import NftPlaceholder from './components/NftPlaceholder'

const Sample = ({ nft, item, market, index, purchaseNFT }) => {
    const [itemSold, setItemSold] = useState(null)
    const [tokenId, setTokenId] = useState(null)
    const [nftAddress, setNftAddress] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [itemId, setItemId] = useState(null)
    const [seller, setSeller] = useState(null)
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const [itemData, setItemData] = useState(null)
    const [nftID, setNftID] = useState(null)
    const tokens = (n) => {
        return ethers.utils.formatEther(n)
    }
    useEffect(() => {
        nftData()
    }, [])

    const nftData = async () => {
        const uri = await nft.tokenURI(item.tokenId)
        try {
            const fetchData = await fetch(uri)
            const data = await fetchData.json()
            const totalPrice = (await market.getTotalPrice(item.itemId)).toString()
            setItemData(data)
            setTotalPrice(totalPrice)
            setImage(`https://${data.image.slice(7, 66)}.ipfs.dweb.link/blob`)
            console.log(data)
        } catch (error) {
            console.log('sample error : ' + error)
        }
    }
    if(!itemData){
        return <><NftPlaceholder/></>
    }
    return (
        <>
            {itemData&&<Card style={{ width: '18rem' }}>
                <Card.Img src={image}></Card.Img>
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

                    <Card.Title onClick={() => { setNftID(index) }} style={{ cursor: 'pointer' }}>{itemData.name}</Card.Title>
                    <Card.Text style={{ height: '45px' }}>{itemData.description.slice(0, 57)}...</Card.Text>


                </Card.Body>
                <ListGroup style={{ borderRadius: '0px', border: 'none' }}>
                    <ListGroupItem><strong>Seller :</strong> {item.seller.slice(0, 5)}....{item.seller.slice(39, 42)}</ListGroupItem>

                </ListGroup>
                <Card.Footer>
                    {purchaseNFT && <Button onClick={() => purchaseNFT(item.itemId.toString(), totalPrice)}>Buy</Button>}
                    <Card.Text as='span' style={{ float: 'right' }}>{tokens(totalPrice)} ETH</Card.Text>
                </Card.Footer>
            </Card>}
        </>
    )
}

export default Sample