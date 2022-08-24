import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { makeGetRequest, userLogedIn } from '../../components/utilities'
import PageHeader from '../../components/layout/PageHeader'
import ProfileStocks from '../../components/profile/ProfileStocks'
import ProfileInfoList from '../../components/profile/ProfileInfoList'
import ProfileActionsAvatar from '../../components/profile/ProfileActionsAvatar'

import './profile.css'

const ProfilePage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [listedStocks, setListedStocks] = useState([])
  const [unlistedStocks, setUnlistedStocks] = useState([])

  useEffect(() => {

    setIsLoading(true)
    makeGetRequest('users/profile', {}, localStorage.getItem('accessToken')) 
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401 ) {
          localStorage.clear()
          throw new Error(response.status)
        } else {
          throw new Error('Failed to get user information .')
        }
      }).then(data => {
        setUser(data.user)
        setListedStocks(data.listedStocks)
        setUnlistedStocks(data.unlistedStocks)
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
      <PageHeader title="Profile" description="Detailed information about your account ." />
      <div className="row custom-header-container">
        <div className="row container-fluid">
          <div className="col-lg-4 my-auto">
            <ProfileActionsAvatar user={user} />
          </div>
          <div className="col-lg-8">
            <div className="card custom-card mb-4">
              <div className="card-body mt-4">
                <ProfileInfoList user={user} />
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid border border-1 rounded-3 mb-3 mx-aut">
          <div className="container py-2">
            <ProfileStocks unlistedStocks={unlistedStocks} listedStocks={listedStocks} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage