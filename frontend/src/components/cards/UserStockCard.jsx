import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { makeContractCallList } from './helpers/list-unlist-fractions-helper'
import CardRow from './CardRow'

const UserStockCard = (props) => {

  const fractionsCountInputRef = useRef()
  const [isListing, setIsListing] = useState(false)

  const toggleListingHandler = () => {
    if (isListing)
      setIsListing(false)
    else
      setIsListing(true)
  }

  const listFractionsHandler = async (event) => { 
    event.preventDefault()

    try {
  
      const fractionsCountToList = fractionsCountInputRef.current.value
      await makeContractCallList(props.stock.id, fractionsCountToList)
  
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
            <CardRow title='Description' value={props.stock.property.description} />
            <CardRow title='Property Price' value={props.stock.property.price.toFixed(2) + ' ( STX ) '} />
            <CardRow title='Address' value={props.stock.address} />
            <CardRow title='Your stocks' value={props.stock.stocksCount + ' / ' + props.stock.property.fractions} />
            <CardRow title='Your stocks worth' value={(props.stock.stocksCount * (props.stock.property.price / props.stock.property.fractions)).toFixed(2) + ' ( STX ) '} />
            <button className="btn btn-outline-secondary mt-2 hidden-form" onClick={toggleListingHandler}>{isListing ? '- List fractions' : '+ List fractions'}</button>
            <form className={"mt-2" + (isListing ? '' : ' d-none')} onSubmit={listFractionsHandler}>
              <div className="input-group mb-3">
                <input type="number" className="form-control" defaultValue="1" min="1" max={props.stock.stocksCount} placeholder="Fractions to list" aria-label="Fractions to list" ref={fractionsCountInputRef} />
                <button className="btn btn-outline-primary" type="submit">List</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UserStockCard