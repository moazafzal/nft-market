import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const NavigationBar = ({ account, connect }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><NavLink to='/' style={{ textDecoration: 'none', color: 'rgb(255 255 255 / 55%)' }}>NFT MarketPlace</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link style={{ textDecoration: 'none', color: 'rgb(255 255 255 / 55%)' }} to='/CreateNFT'>Create NFT</Link></Nav.Link>
            {/* <Nav.Link><Link to='/MyNFT' style={{ textDecoration: 'none', color: 'rgb(255 255 255 / 55%)' }}>My NFT</Link></Nav.Link> */}
            {/* <Nav.Link><Link to='/sampleMarket' style={{ textDecoration: 'none', color: 'rgb(255 255 255 / 55%)' }}>Sample Market</Link></Nav.Link> */}
            
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            {/* {account?<Nav.Item style={{color:'white'}} >{account.slice(0,6)}....{account.slice(38,42)}</Nav.Item>:
            
            <Nav.Link onClick={()=>{connect()}}>Connect</Nav.Link>} */}

            {account ? <NavDropdown title={`${account.slice(0, 6)}....${account.slice(38, 42)}`} id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to='/MyNFT' style={{ textDecoration: 'none', color: 'black' }}>My NFT</Link>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <Link to='/ListedNFT' style={{ textDecoration: 'none', color: 'black' }}>Listed Item</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Disconnect
              </NavDropdown.Item>
            </NavDropdown> :
              <Nav.Link onClick={() => { connect() }}>Connect</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;