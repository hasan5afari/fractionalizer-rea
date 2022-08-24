import PropertyShareholderCard from '../cards/PropertyShareholderCard'

const PropertyUnlistedStocksList = (props) => {
  return (
    <div className="table-responsive-sm">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Fractions</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {props.property.unlistedStocks.map((sh) => {
            return <PropertyShareholderCard
              key={sh.id}
              user={{
                ...sh.owner,
                stocksCount: sh.stocksCount,
                stocksValue: (sh.stocksCount * (props.property.price / props.property.fractions).toFixed(2))
              }} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PropertyUnlistedStocksList