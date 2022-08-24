import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { makeGetRequest, userLogedIn } from '../../components/utilities'
import PageHeader from '../../components/layout/PageHeader'
import PropertyList from '../../components/marketplace/PropertyList'

import './marketplace.css'

const MarketplacePage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [properties, setProperties] = useState([])

  useEffect(() => {

    setIsLoading(true)
    makeGetRequest('marketplace', {}, localStorage.getItem('accessToken')) 
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401 ) {
          localStorage.clear()
          throw new Error(response.status)
        } else {
          throw new Error('Failed to get properties information .')
        }
      }).then(data => {
        setProperties(data.properties)
        setIsLoading(false)
      }).catch((error) => {
        console.log(error)
      })

  }, [])

  if (!userLogedIn()) {
    return <Navigate to="/" replace />
  }

  if (isLoading) {
    return (
      <></>
    )
  }

  return (
    <div className="container-fluid d-flex flex-column pt-5">
      <PageHeader title="Marketplace" description="Browse properties ." />
      <div className="row d-flex flex-column justify-content-center align-items-center px-5">
        <PropertyList properties={properties} />
      </div>
    </div>
  )
}

export default MarketplacePage