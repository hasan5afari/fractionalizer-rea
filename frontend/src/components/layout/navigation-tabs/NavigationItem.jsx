const NavigationItem = (props) => {
  return (
    <li className="nav-item" role="presentation">
      <button
        className={"nav-link" + (props.activeTab ? " active" : "")}
        id={props.tabId}
        data-bs-toggle="pill"
        data-bs-target={'#' + props.tabContentId}
        type="button"
        role="tab"
        aria-controls={props.tabContentId}
        aria-selected="true"
      >
        {props.tabName}
      </button>
    </li>                          
  )
}

export default NavigationItem