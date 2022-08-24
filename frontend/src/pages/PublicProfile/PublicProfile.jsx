import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Navigate } from 'react-router-dom'
import { makeGetRequest, userLogedIn } from '../../components/utilities'
import UserInfoContext from '../../contexts/UserInfo'
import PageHeader from '../../components/layout/PageHeader'
import PublicProfileAvatar from "../../components/public-profile/PublicProfileAvatar"
import PublicProfileStocks from "../../components/public-profile/PublicProfileStocks"
import PublicProfileInfoList from "../../components/public-profile/PublicProfileInfoList"

import './public_profile.css'

const PublicProfilePage = () => {

  const { username } = useParams()
  const userInfo = useContext(UserInfoContext)
  const [isLoading, setIsLoading] = useState(true)
  const [publicUser, setPublicUser] = useState({})
  const [listedStocks, setListedStocks] = useState([])
  const [unlistedStocks, setUnlistedStocks] = useState([])

  useEffect(() => {

    setIsLoading(true)
    makeGetRequest('users/' + username , { username }, localStorage.getItem('accessToken')) 
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
        setPublicUser(data.publicUser)
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

  if (userInfo.username === username) {
    return <Navigate to="/users/profile" replace />
  }

  if (isLoading) {
    return (
      <></>
    )
  }

  return (
    <div className="container-fluid d-flex flex-column pt-5">
      <PageHeader title="Profile" description={publicUser.fullname + '\'s profile .'} />
      <div className="row custom-header-container">
        <div className="row container-fluid mt-5">
          <div className="col-lg-4">
            <PublicProfileAvatar user={publicUser} /> 
          </div>
          <div className="col-lg-8">
            <div className="card custom-card mb-4">
              <div className="card-body">
                <PublicProfileInfoList user={publicUser} />
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid border border-1 rounded-3 mb-3 mx-aut">
          <div className="container py-2">
            <PublicProfileStocks unlistedStocks={unlistedStocks} listedStocks={listedStocks} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicProfilePage