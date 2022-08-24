const NavigationItemContent = (props) => {
  return (
    <div
      className={"tab-pane fade" + (props.activeContent ? " show active" : "")}
      id={props.tabContentId}
      role="tabpanel"
      aria-labelledby={props.tabContentId + "-tab"}
    >
      {props.children}
    </div>
  )
}

export default NavigationItemContent