import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

const ChangeChainID = ({ chainID, children }) => {
    if (chainID != 11155111) {
        return (
            <>
                <Card className='mx-auto my-5' border='primary' bg='info' style={{ width: '650px' }}>
                    <Card.Header as='h3' style={{ backgroundColor: 'white' }}>Connect with sepolia Test Network</Card.Header>
                    <Card.Img variant="top" src="sepolia.png" style={{ height: '300px', width: '100%' }} className='' />
                    
                </Card>
            </>
        )
    } else {
        return <Navigate to='/'/>
    }
}

export default ChangeChainID