import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { makeGetRequest, userLogedIn } from '../components/utilities'
import UserRequests from '../components/requests/UserRequests'
import PageHeader from '../components/layout/PageHeader'

const RequestsPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [allRequests, setAllRequests] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])

  useEffect(() => {

    setIsLoading(true)
    makeGetRequest('users/profile/requests', {}, localStorage.getItem('accessToken')) 
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401 ) {
          localStorage.clear()
          throw new Error(response.status)
        } else {
          throw new Error('Failed to get user requests .')
        }
      }).then(data => {
        setAllRequests(data.allRequests)
        setPendingRequests(data.pendingRequests)
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
      <PageHeader title="Requests" description="Your requests will be shown here ." />
      <div className="row custom-header-container px-5">
        <div className="row container-fluid border border-1 rounded-3 mb-3 mx-aut">
          <div className="container py-2">
            <UserRequests allRequests={allRequests} pendingRequests={pendingRequests} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestsPage