const ProfileInfo = (props) => {
  return (
    <div className="row">
      <div className="col-sm-3">
        <p className="text-muted mb-0">
          {props.children} 
          <span>{props.title}</span>
        </p>
      </div>
      <div className="col-sm-9">
        <p className="mb-0 bold-text">
          <span>{props.value}</span>
        </p>
      </div>
    </div>
  )
}

export default ProfileInfo