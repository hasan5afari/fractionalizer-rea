const NavigationTabs = (props) => {
  return (
    <ul className="nav nav-pills p-3 mb-3" id="pills-tab" role="tablist">
      {props.children}
    </ul>
  )
}

export default NavigationTabs