import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

const Login = ({ connect, account }) => {
    
    if (!account) {
        return (
            <>
                <Card className='mx-auto my-5' border='primary' bg='info' style={{ width: '800px' }}>
                    <Card.Header as='h3' style={{ backgroundColor: 'white' }}>Connect With Metamask wallet</Card.Header>
                    <Card.Img variant="top" src="MetaMask.png" style={{ height: '250px', width: '450px' }} className='' />
                    <Card.Body>
                        <div className="d-grid gap-2">
                            <Button onClick={() => { connect() }} size='lg' variant="primary">Connect</Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    }
    if(account){
        return <Navigate to='/'/>
    }
}

export default Login