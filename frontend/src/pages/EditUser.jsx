import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { userLogedIn, makeGetRequest } from '../components/utilities'
import { EditUserContextProvider } from '../contexts/EditUser'
import EditUserInputFieldList from '../components/edit-user/EditUserInputFieldList'
import EditUserActionList from '../components/edit-user/EditUserActionList'
import EditUserAvatar from '../components/edit-user/EditUserAvatar'
import PageHeader from '../components/layout/PageHeader'

const EditUserPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {

    setIsLoading(true)
    makeGetRequest('users/profile/edit', {}, localStorage.getItem('accessToken')) 
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
      <PageHeader title="Edit Profile" description="Edit your account information ." />    
      <div className="row custom-header-container p-5">
        <EditUserContextProvider>
          <div className="col-lg-4">
            <EditUserAvatar user={user} />
            <div className="container d-flex justify-content-center align-items-center" >
              <EditUserActionList />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card custom-card mb-4">
              <div className="card-body mt-2">
                <EditUserInputFieldList user={user} />
              </div>
            </div>
          </div>
        </EditUserContextProvider>
      </div>
    </div> 
  )
}

export default EditUserPage