import { useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserInfoContext from '../../contexts/UserInfo'
import { makePostRequest } from '../utilities'

const LoginForm = () => {

  const navigation = useNavigate()
  const { updateFullName, updateImage, updateUsername } = useContext(UserInfoContext)
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()

  const loginHandler = async (event) => {
    event.preventDefault()

    const username = usernameInputRef.current.value
    const password = passwordInputRef.current.value

    try {
      const response = await makePostRequest('authentication/login', {
        username,
        password
      })

      if (response.status === 200) {

        const result = await response.json()
        updateFullName(result.user.fullname)
        updateUsername(result.user.username)
        updateImage(result.user.image)
        localStorage.setItem('accessToken', result.token)
        localStorage.setItem('logedIn', 'true')
        navigation('/users/profile', { replace: true })
      
      } else if (response.status === 401) {
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
    <form onSubmit={loginHandler}>
      <div className="form-outline form-floating mb-4">
        <input type="text" className="form-control form-control-md" placeholder="Enter a valid username" ref={usernameInputRef} />
        <label className="form-label" htmlFor="formUsernameInput">Username</label >
      </div>

      <div className="form-outline form-floating mb-4">
        <input type="password" className="form-control form-control-md" placeholder="Enter password" ref={passwordInputRef} />
        <label className="form-label" htmlFor="formPasswordInput" >Password</label>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button type="submit" className="btn btn-primary btn-md" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}} >
          Login
        </button>
        <p className="small fw-bold my-3 pt-1">
          Don't have an account ?
          <Link to="/auth/register" className="link-danger ps-2">Register</Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm