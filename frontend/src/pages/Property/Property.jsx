import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Navigate } from 'react-router-dom'
import { makeGetRequest, userLogedIn } from '../../components/utilities'
import PageHeader from '../../components/layout/PageHeader'
import PropertyImages from '../../components/property/PropertyImages'
import PropertyInfoList from '../../components/property/PropertyInfoList'
import PropertyShareholders from '../../components/property/PropertyShareholders'

import './property.css'

const PropertyPage = () => {

  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [property, setProperty] = useState({})

  useEffect(() => {

    setIsLoading(true)
    makeGetRequest('properties/' + id , {}, localStorage.getItem('accessToken')) 
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401 ) {
          localStorage.clear()
          throw new Error(response.status)
        } else {
          throw new Error('Failed to get property infromation .')
        }
      }).then(data => {
        setProperty(data.property)
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
      <PageHeader title='Property INFO' description='You can see detailed information about property and its fractions .' />
      <div className="row custom-header-container">
        <div className="row container-fluid mb-4">
          <div className="col-lg-5">
            <PropertyImages images={property.images} />
          </div>
          <div className="col-lg-7 my-auto">
            <div className="card custom-card mb-4">
              <div className="card-body">
                <PropertyInfoList property={property} />
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid border border-1 rounded-3 mb-3 mx-aut">
          <div className="container py-2">
            <PropertyShareholders property={property} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPage