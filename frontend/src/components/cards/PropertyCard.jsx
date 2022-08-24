import { Link } from 'react-router-dom'

const PropertyCard = (props) => {
  return (
    <div className="col">
      <div className="card card-blog">
        <div className="card-image">
          <img className="img" src={props.thumbnail} style={{width: '100%', height: '200px'}} />
        </div>
        <div className="table">
          <h4 className="card-caption pt-3">
            <Link to={{ pathname: '/properties/' + props.id, query: { propertyId: props.id }}}>{props.name}</Link>
          </h4>
          <p className="card-description pt-2 market-card-body" style={{height: '150px'}}>
            {props.description} 
          </p>
          <hr />
          <p className="badge rounded-pill bg-danger p-2 d-flex justify-content-center">
            {props.price} ( STX )
          </p>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard