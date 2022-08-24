import CardRow from './CardRow'

const getRequestTitle = (request) => {
  if (request.type === 'submitProperty')
    return 'Submit Property'
  else if (request.type === 'listFractions')
    return 'List Fractions'
  else if (request.type === 'unlistFractions')
    return 'Unlist Fractions'
  else
    return 'Purchase Fractions'
}

const RequestCard = (props) => {
  return (
    <article className="postcard light red">
      <div className="postcard__text t-dark">
        <h1 className="postcard__title red">
          <span>
            {getRequestTitle(props.request)} 
          </span>
        </h1>
        <div className="postcard__subtitle small"></div>
        <div className="postcard__bar"></div>
        <div className="postcard__preview-txt d-flex flex-column">
          <div className="row pt-2">
            <div className="col col-lg-9">
              <div className="row">
                <CardRow title='State' value={props.request.status} />
                <CardRow title='Description' value={props.request.description} />
                <CardRow title='Address' value={props.request.address} />
                <CardRow title='Created on' value={props.request.createdOn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default RequestCard