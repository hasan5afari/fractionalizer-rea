import ProfileActionList from './ProfileActionList'

const ProfileActionsAvatar = (props) => {
  return (
    <>
      <div className="card custom-card mb-1">
        <div className="card-body text-center">
          <img src={props.user.image} alt="avatar" className="rounded-circle img-fluid" style={{width: "150px", height: "150px", objectFit: "cover"}} />
          <h3 className="lobster-font mt-3 mb-1">{props.user.fullname}</h3>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center" >
        <ProfileActionList user={props.user} />
      </div>
    </>
  )
}

export default ProfileActionsAvatar