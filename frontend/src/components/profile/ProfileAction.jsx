import { Link } from 'react-router-dom'

const ProfileAction = (props) => {
  return (
    <Link to={props.link} alt={props.alt} className={"mx-2 profile-actions-icon " + (props.customClass ? props.customClass : "")} onClick={props.onClick}>
      {props.children}
    </Link>
  )
}

export default ProfileAction