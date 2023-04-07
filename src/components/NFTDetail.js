import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Badge, Button, CloseButton, Col, Collapse, Image, Placeholder, Row,  Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NFTDetail = ({  setNftDetail, purchaseNFT,nftDetail}) => {
  const [open, setOpen] = useState(true)

  const tokens = (n) => {
    return ethers.utils.formatEther(n)
  }
  useEffect(() => {
    if (nftDetail) {
      setOpen(true)
      window.scrollTo(0, 60)
    }

  }, [nftDetail])

  return (
    <>
      <Collapse in={open}>

        <div style={{ width: '96%', backgroundColor: 'gray', height: '435px' }} className='mx-auto'>
          <CloseButton onClick={() => { setOpen(false); setNftDetail(null) }} variant='white' style={{ position: 'absolute', right: '48px', top: '69px' }} />
          {nftDetail ? <Row >
            <Col><Image src={nftDetail.image} rounded height={400} style={{ marginLeft: '17px', marginTop: '15px', marginBottom: '10px' }} /></Col>
            <Col>
              <h1 className='text-light mt-3'>{nftDetail.name}</h1>
              <p>{nftDetail.description}</p>
              <Table className='mt-4'>
                <tbody>
                  <tr>
                    <td>Seller</td>
                    <td>{nftDetail.seller.slice(0, 5)}...{nftDetail.seller.slice(38, 42)}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{tokens(nftDetail.price)}</td>
                  </tr>
                  <tr>
                    <td>Token ID</td>
                    <td><Badge>{nftDetail.tokenId.toString()}</Badge></td>
                  </tr>
                  <tr>
                    <td>Contract Address</td>
                    <td>
                      <Link to={`https://goerli.etherscan.io/address/${nftDetail.contractAddress}`} target="_blank" style={{ color: 'white' }}>
                        {nftDetail.contractAddress.slice(0, 5)}...{nftDetail.contractAddress.slice(38, 42)}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {purchaseNFT && <div style={{ marginTop: '85px' }}>
                <Button onClick={() => purchaseNFT(nftDetail.tokenId, nftDetail.price)}>Buy NFT</Button>
              </div>}
            </Col>
          </Row> :
            <Row>
              <Col>
              <Placeholder bg='info'  xs={12} style={{height:'400px',marginLeft: '17px', marginTop: '15px'}}></Placeholder>
              </Col>
              <Col>
              <Placeholder as='h1' animation='glow'><Placeholder xs={4}/></Placeholder>
              <Placeholder as='p' animation='glow'><Placeholder xs={8}/></Placeholder>
              <Placeholder as='p' animation='glow'><Placeholder xs={8}/></Placeholder>
              <Placeholder as='p' animation='glow'><Placeholder xs={8}/></Placeholder>
              <Placeholder as='p' animation='glow'><Placeholder xs={8}/></Placeholder>
              <Placeholder.Button animation='glow' xs={4}/>
              </Col>
            </Row>}
        </div>
      </Collapse>
    </>
  )
}

export default NFTDetail