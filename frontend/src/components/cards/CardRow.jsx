const RequestCardRow = (props) => {
  return (
    <>
      <div className="col-sm-3 text-muted mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16" >
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
        <span>{props.title}</span>
      </div>
      <div className="col-sm-9">
        <span className="mb-0 bold-text">{props.value}</span>
      </div>
    </>
  )
}

export default RequestCardRow