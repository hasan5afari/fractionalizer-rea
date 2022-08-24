import { Link } from 'react-router-dom'

const PropertyShareholderCard = (props) => {
  return (
    <tr d="d-flex justify-content-center align-items-center">
      <td>
        <div className="d-flex align-items-center">
          <img className="circle-img me-4" src={props.user.image} />
          <div className="user-info__basic">
            <Link to={{ pathname: '/users/' + props.user.username, query: { username: props.user.username }}} className="custom-link">
              <h5 className="mb-0">{props.user.fullname}</h5>
            </Link>
            <p className="text-muted mb-0">@{props.user.username}</p>
          </div>
        </div>
      </td>
      <td><h4 className="pe-2 h5">{props.user.stocksCount}</h4></td>
      <td><h4 className="pe-2 h5">{props.user.stocksValue.toFixed(2)}<span className="ps-2" style={{fontWeight: '800'}}>( STX )</span></h4></td>
    </tr>
  )
}

export default PropertyShareholderCard