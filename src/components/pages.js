import React from 'react'
import { Pagination } from 'react-bootstrap'

const Pages = ({pages}) => {

  return (
    <>
    <Pagination size='lg'>
        <Pagination.First/>
        <Pagination.Prev/>
        {
          pages&&pages.map((e)=>{
            return e
          })
        }
        <Pagination.Next/>
        <Pagination.Last/>
    </Pagination>
    </>
  )
}

export default Pages