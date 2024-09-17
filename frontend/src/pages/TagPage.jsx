import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar';


function TagPage() {

    const id = useParams();
    useEffect(() => {

    }, [id])
  return (
    <div>
        <NavBar />
    </div>
  )
}

export default TagPage