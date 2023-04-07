import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';

const Alert = () => {
    return (
        <>  
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    )
}

export default Alert