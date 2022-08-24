const EditUserInputField = (props) => {

  const updateContextHandler = (event) => {
    props.updateContextField(event.target.value)
  }

  return (
    <div className="row d-flex align-items-center">
      <div className="col-sm-3">
        <p className="text-muted my-0">
          {props.children}
          <span>{props.title}</span>
        </p>
      </div>
      <div className="col-sm-9">
        <p className="mb-0 bold-text">
          <input id={props.inputId} type={props.inputType} className="form-control form-control-md" placeholder={props.inputPlaceholder} onInput={updateContextHandler}></input>
        </p>
      </div>
    </div>
  )
}

export default EditUserInputField