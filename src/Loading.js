import React from 'react'
import NftPlaceholder from './components/NftPlaceholder'

const Loading = () => {
  return (
    <div className='my-2 mx-3'>
        <div style={{ float: 'left', marginLeft: '25px', marginRight: '10px' }} className=' my-2'>
            <NftPlaceholder/>
        </div>

        <div style={{ float: 'left', marginLeft: '25px', marginRight: '10px' }} className=' my-2'>
            <NftPlaceholder/>
        </div>

        <div style={{ float: 'left', marginLeft: '25px', marginRight: '10px' }} className=' my-2'>
            <NftPlaceholder/>
        </div>
        
        <div style={{ float: 'left', marginLeft: '25px', marginRight: '10px' }} className=' my-2'>
            <NftPlaceholder/>
        </div>
        
    </div>
  )
}

export default Loading