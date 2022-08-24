import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeContractCallPurchase } from './helpers/purchase-fractions-helper'
import CardRow from './CardRow'

const UserStockCardPublicForSale = (props) => {

  const fractionsCountInputRef = useRef()
  const [isPurchasing, setIsPurchasing] = useState(false)

  const togglePurchasingHandler = () => {
    if (isPurchasing)
      setIsPurchasing(false)
    else
      setIsPurchasing(true)
  }

  const purchaseFractionsHandler = async (event) => { 
    event.preventDefault()

    try {
  
      const fractionsCountToPurchase = fractionsCountInputRef.current.value
      await makeContractCallPurchase(props.stock.id, fractionsCountToPurchase)
  
    } catch (error) {
      console.log(error)
    }
  }

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
            <button className="btn btn-outline-secondary mt-2 hidden-form" onClick={togglePurchasingHandler}>{isPurchasing ? '- Purchase fractions' : '+ Purchase fractions'}</button>
            <form onSubmit={purchaseFractionsHandler} className={"mt-2" + (isPurchasing ? '' : ' d-none')}>
              <div className="input-group mb-3">
                <input type="number" className="form-control" defaultValue="1" min="1" max={props.stock.value} placeholder="Fractions to buy" aria-label="Fractions to buy" ref={fractionsCountInputRef}></input>
                <button className="btn btn-outline-primary" type="submit">Purchase</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UserStockCardPublicForSale