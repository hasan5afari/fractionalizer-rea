import PropertyShareholderCardForSale from '../cards/PropertyShareholderCardForSale'

const PropertyListedStocksList = (props) => {
  return (
    <div className="table-responsive-sm">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Fractions</th>
            <th>Value</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {props.property.listedStocks.map((sh) => {
            return <PropertyShareholderCardForSale
              key={sh.id}
              user={{
                ...sh.owner,
                stocksCount: sh.stocksCount,
                stocksValue: (sh.stocksCount * (props.property.price / props.property.fractions))
              }}
              stock={{
                id: sh.id
              }} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PropertyListedStocksList