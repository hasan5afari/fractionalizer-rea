import { Link } from 'react-router-dom'
import CardRow from './CardRow'

const UserStockCardPublic = (props) => {
  return (
    <article className="postcard light red mx-3">
      <a className="postcard__img_link">
        <img className="postcard__img" src={props.stock.property.images[0].image} alt="Property Image" />
      </a>
      <div className="postcard__text t-dark">
        <h1 className="postcard__title red">
          <Link to={{ pathname: '/properties/' + props.stock.property._id, query: { propertyId: props._id }}}>
            {props.stock.property.name}
          </Link>
        </h1>
        <div className="postcard__subtitle small"></div>
        <div className="postcard__bar"></div>
        <div className="postcard__preview-txt d-flex flex-column">
          <div className="row pt-2">
            <CardRow title="Description" value={props.stock.property.description} />
            <CardRow title="Property Price" value={props.stock.property.price.toFixed(2) + ' ( STX ) '} />
            <CardRow title="User stocks" value={props.stock.stocksCount + ' / ' + props.stock.property.fractions} />
            <CardRow title="User stocks worth" value={(props.stock.stocksCount * (props.stock.property.price / props.stock.property.fractions)).toFixed(2) + ' ( STX ) '} />
          </div>
        </div>
      </div>
    </article>
  )
}

export default UserStockCardPublic