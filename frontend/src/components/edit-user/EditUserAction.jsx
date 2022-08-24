const ProfileAction = (props) => {
  return (
    <a href={props.link} alt={props.alt} className={"mx-2 profile-actions-icon " + (props.customClass ? props.customClass : "")} onClick={props.onClick}>
      {props.children}
    </a>
  )
}

export default ProfileAction