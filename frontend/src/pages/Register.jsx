import { Navigate } from 'react-router-dom'
import { userLogedIn } from '../components/utilities'
import RegisterForm from '../components/register/RegisterForm'
import PageHeader from '../components/layout/PageHeader'

const RegisterPage = () => {

  if (userLogedIn())
    return <Navigate to='/users/profile' replace />

  return (
    <div className="container-fluid d-flex flex-column pt-5">
      <PageHeader title="Register" description="Create a free account to use the app ." />
      <div className="row d-flex flex-column flex-sm-row justify-content-between align-items-center mt-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100" >
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="/images/register_login.webp" className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mb-5 px-auto">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage