const PageHeader = (props) => {
  return (
    <div className="row">
      <div className="col custom-header-container">
        <h1 className="header">{props.title}</h1>
        <h3 className="sub-header">{props.description}</h3>
      </div>
    </div>
  )
}

export default PageHeader