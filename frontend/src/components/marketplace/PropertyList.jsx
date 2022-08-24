import PropertyCard from '../cards/PropertyCard'

const PropertyList = (props) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-4 gy-5 my-5" style={{height: '300px'}}>
      {props.properties.map((property) => {
        return <PropertyCard
          key={property.id}
          id={property.id}
          name={property.name}
          description={property.description}
          price={property.price}
          thumbnail={property.images[0].image} />
      })}
    </div>
  )
}

export default PropertyList