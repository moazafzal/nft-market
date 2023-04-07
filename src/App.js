import './App.css';
import NavigationBar from './components/Navbar';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './Login';
import { RequireAuth } from './components/RequireAuth';
import Alert from './components/Alert';
import { toast } from 'react-toastify';
import ChangeChainID from './ChangeChainID';
import NFTCard from './components/NFT';
import NFT from './abis/NFT.json'
import Marketplace from './abis/Marketplace.json'
import config from './config.json'
import CreateNFT from './CreateNFT';
import { NFTStorage, Blob } from 'nft.storage'
import NftMarketPlace from './NftMarketPlace';
import LoadingBar from 'react-top-loading-bar';
import MyNFT from './MyNFT';
import Sample from './Sample';
import SampleMarket from './SampleMarket';
import ListedNFT from './ListedNFT';

function App() {
  const [account, setAccount] = useState(null)
  const [chainID, setChainID] = useState(null)
  const [nft, setNft] = useState(null)
  const [marketPlace, setMarketPlace] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [pages, setPages] = useState(1)
  useEffect(() => {
    loadBlockChainData()
  }, [])

  const loadBlockChainData = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
    setProgress(10)
    setChainID(network.chainId)
    window.ethereum.on('accountsChanged', connect)
    window.ethereum.on('chainChanged', async (chainId) => {
      setChainID(chainId)
      await loadBlockChainData()
    })

    const signer = provider.getSigner()
    const Nft = new ethers.Contract(config[network.chainId].NFT.address, NFT.abi, signer)
    const market = new ethers.Contract(config[network.chainId].Marketplace.address, Marketplace.abi, signer)
    setProgress(20)
    setNft(Nft)
    // console.log(Nft)
    setMarketPlace(market)
    const itemCount = (await market.itemCount()).toString()
    setProgress(30)
    const itemPerPage = 8
    const p = Math.ceil(itemCount / itemPerPage)
    setPages(p)
    setLoading(false)
    setProgress(100)
  }
  const purchaseNFT = async (itemID, price) => {
    try {
      const transaction = await marketPlace.purchaseItem(itemID, { value: price })
      await transaction.wait()
      toast.success('You have successfully Purchase NFT')
      await loadBlockChainData()
      setPurchaseLoading(true)

    } catch (error) {
      console.log(error)
      toast.error('NFT purchase Error')
      if (error) {
        setPurchaseLoading(false)
      }
    }
  }
  const connect = async (accounts) => {
    try {
      if (accounts && accounts.length === 0) {
        console.log('no accounts')
        setAccount(null)
        toast.info('Logged Out')
      } else {
        if (!window.ethereum.isConnected()) {
          toast.warning('Wallet is not connect')
          setAccount(null)
          toast.info('Logged Out')
        }
        const acounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(acounts[0])
        setAccount(account)
        toast.success('you have successfully Logged In')

        await loadBlockChainData()
      }
    } catch (err) {
      if (err.code === 4001) {
        console.log(err.message, 'warning')
        toast.error('User Reject the Request')
      }
    }
  }

  return (
    <Router>
      <NavigationBar connect={connect} account={account} />
      <Alert />
      <LoadingBar color='red' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Routes>
        <Route path='/' element={
          <RequireAuth chainID={chainID} account={account}>
            <NftMarketPlace setPurchaseLoading={setPurchaseLoading} purchaseLoading={purchaseLoading} purchaseNFT={purchaseNFT} loading={loading} nft={nft} market={marketPlace} account={account}  />
          </RequireAuth>}>
        </Route>
        <Route path='MyNFT' element={
          <RequireAuth chainID={chainID} account={account}>
            <MyNFT loading={loading} account={account} nft={nft} market={marketPlace} />
          </RequireAuth>
        }></Route>
        <Route path='ListedNFT' element={
          <RequireAuth chainID={chainID} account={account}>
            <ListedNFT loading={loading} account={account} nft={nft} market={marketPlace} />
          </RequireAuth>
        }></Route>
        <Route path='*' element={<h1>Page Not Found</h1>}></Route>
        <Route path='/NFT' element={<NFTCard />}></Route>
        <Route path='sampleMarket' element={<SampleMarket nft={nft} market={marketPlace} />}></Route>
        <Route path='/login' element={<Login connect={connect} account={account} />}></Route>
        <Route path='CreateNFT' element={
          <RequireAuth chainID={chainID} account={account}>
            <CreateNFT nft={nft} marketPlace={marketPlace} />
          </RequireAuth>
        }></Route>
        <Route path='/ChangeChainID' element={<ChangeChainID chainID={chainID} />}></Route>

      </Routes>

    </Router>
  )
}

export default App;
