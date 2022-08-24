import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserInfoContext from '../../contexts/UserInfo'

const NavigationBar = () => {

  const { fullname, image } = useContext(UserInfoContext)

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light shadow position-fixed w-100 py-3" style={{ zIndex: 99 }} >
      <div className="container-fluid d-flex">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" >
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>

        <div className="collapse navbar-collapse ps-4" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-hexagon-half" viewBox="0 0 16 16" >
              <path d="M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z" />
            </svg>
          </Link>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <hr className="brand-hr px-auto" />
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marketplace">Marketplace</Link>
            </li>
            <li className="nav-item">
              <hr className="brand-hr px-auto" />
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center pe-2" >
            <span style={{ fontWeight: 800 }}>{fullname}</span>
          </div>
          <Link id="navbar-avatar" to="/users/profile" className="pe-4">
            {image && <img src={image} alt="avatar" className="rounded-circle img-fluid" style={{width: '2rem', height: '2rem'}} />}
            {!image && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person custom-link" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
            } 
          </Link>
        </div>
      </div>
    </nav>

  )

}

export default NavigationBar