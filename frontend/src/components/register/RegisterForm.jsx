import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makePostRequest } from '../utilities'

const RegisterForm = (props) => {

  const navigation = useNavigate()
  const fullnameInputRef = useRef()
  const usernameInputRef = useRef()
  const addressInputRef = useRef()
  const passwordInputRef = useRef()

  const registerHandler = async (event) => {
    event.preventDefault()

    const fullname = fullnameInputRef.current.value
    const username = usernameInputRef.current.value
    const address = addressInputRef.current.value
    const password = passwordInputRef.current.value

    try {

      const response = await makePostRequest('authentication/register', {
        fullname,
        username,
        address,
        password
      })
  
      if (response.status === 201) {
        navigation('/auth/login')
      } else if (response.status === 400) {
        localStorage.removeItem('logedIn')
      } else {
        const result = await response.json()
        throw new Error(result.error)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={registerHandler}>
      <div className="form-outline form-floating mb-4">
        <input type="text" className="form-control form-control-md" placeholder="Enter your full name" ref={fullnameInputRef} />
        <label className="form-label" htmlFor="formFullNameInput">Full Name</label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input type="text" className="form-control form-control-md" placeholder="Enter a valid username" ref={usernameInputRef} />
        <label className="form-label" htmlFor="formUsernameInput">Username</label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input type="text" className="form-control form-control-md" placeholder="Enter Address" ref={addressInputRef} />
        <label className="form-label" htmlFor="formPrincipalInput">STX Address</label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input type="password" className="form-control form-control-md" placeholder="Enter password" ref={passwordInputRef} />
        <label className="form-label" htmlFor="formPasswordInput">Password</label>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button type="submit" className="btn btn-primary btn-md" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>
          Register
        </button>
        <p className="small fw-bold my-3 pt-1">
          Already registered ?
          <Link to="/auth/login" className="link-danger ps-2">Login</Link>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm