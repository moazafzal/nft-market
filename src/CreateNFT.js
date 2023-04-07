import React, { useState } from 'react'
import { Button, Container, Form, Image, InputGroup, ProgressBar, Spinner } from 'react-bootstrap'
import { NFTStorage, Blob } from 'nft.storage'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateNFT = ({ nft, marketPlace }) => {
    const [nftName, setNftName] = useState(null)
    const [nftCost, setNftCost] = useState(null)
    const [nftDescription, setNftDescription] = useState(null)
    const [nftImage, setNftImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [progressWait, setProgressWait] = useState(false)
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const navigate = useNavigate()
    const handleSubmit = async () => {
        setProgressWait(true)
        if (nftName == null && nftCost == null && nftDescription == null) {
            setProgressWait(false)
            return
        }
        let ipnft = await uploadToIPFS()
        const uri = `https://${ipnft}.ipfs.dweb.link/metadata.json`
        const uriMint = await nft.mint(uri)
        await uriMint.wait()
        setProgress(80)
        const id = nft.tokenCount()
        const approve = await nft.setApprovalForAll(marketPlace.address, true)
        await approve.wait()
        setProgress(90)
        const listingPrice = ethers.utils.parseEther(nftCost.toString())
        const listItem = await marketPlace.makeItem(nft.address, id, listingPrice)
        await listItem.wait()
        setProgress(100)
        toast.success('NFT Created Succefully')
        setNftCost(null)
        setNftDescription(null)
        setNftImage(null)
        setNftName(null)
        setProgressWait(false)
        setProgress(0)
        navigate('/ListedNFT')
    }

    const uploadToIPFS = async () => {
        if (typeof nftImage !== 'undefined') {
            try {
                const result = await storeNFT(nftImage)
                setProgress(70)
                return result.ipnft
            } catch (error) {
                console.log('image upload error' + error)

            }
        }
    }
    const storeNFT = async (image) => {
        const imagePath = await fileFromPath(image)
        const nftstorage = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5Y0FlNTJBRDFBQUQzMjAwZGI3ZDdjMTdkNkExNkQzQ2FFZUVBMDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzgxMTcwNzQ1NCwibmFtZSI6Im16In0.iKi8goXosKfRf56Xbs4hapWGO-0y_24xn4gKlCam8Qg' })
        if (nftCost && nftName && nftDescription && nftImage) {
            const result = await nftstorage.store({ cost: nftCost, name: nftName, description: nftDescription, image: imagePath })
            setProgress(50)
            return result
        }
        return
    }
    const fileFromPath = async (filePath) => {
        const type = filePath.type
        const name = filePath.name
        setProgress(25)
        return new Blob([filePath], { type: type })
    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    }
    return (
        <Container className='mt-4'>
            <ProgressBar>
            <ProgressBar animated now={progress} />
            </ProgressBar>

            <Form.Group controlId="formFile" className="mb-3 mt-3">
            {createObjectURL&&<Image className='mt-3' src={createObjectURL} width={200}/>}
                {/* <Form.Label>Select Image</Form.Label> */}
                <Form.Control type="file" onChange={(e) => { setNftImage(e.target.files[0]) ; uploadToClient(e)}} />
            </Form.Group>
            
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">NFT Name</InputGroup.Text>
                <Form.Control onChange={(e) => { setNftName(e.target.value) }} placeholder="NFT Name" aria-label="nftName" aria-describedby="basic-addon1" />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">NFT Cost</InputGroup.Text>
                <Form.Control placeholder="Cost" onChange={(e) => { setNftCost(e.target.value) }} aria-label="nftCost" aria-describedby="basic-addon1" />
                <InputGroup.Text id="basic-addon2">Eth</InputGroup.Text>
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>Description of NFT</InputGroup.Text>
                <Form.Control onChange={(e) => { setNftDescription(e.target.value) }} as="textarea" aria-label="With textarea" />
            </InputGroup>  

            {!progressWait?<Button onClick={handleSubmit} className='mt-2'>Create NFT</Button>:
            <Button disabled className='mt-2'>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                Loading...
                </Button>}
        </Container>
    )
}

export default CreateNFT