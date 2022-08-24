import { Link, Navigate } from 'react-router-dom'
import { userLogedIn } from '../components/utilities'
import PageHeader from '../components/layout/PageHeader'

const GetStartedPage = () => {

  if (userLogedIn())
    return <Navigate to='/marketplace' replace />

  return (
    <div className="container-fluid d-flex flex-column pt-5">
      <PageHeader title="REA" description="A new way to buy stuff ." />
      <div className="row d-flex flex-column justify-content-center align-items-center mt-5" >
        <img src="/images/property_vector.png" alt="Home" className="rounded mx-auto d-block custom-img-container" />
        <Link to="/auth/login" className="btn btn-primary col-6 col-md-5 col-lg-4 col-xl-3 mt-5" type="button" >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default GetStartedPage