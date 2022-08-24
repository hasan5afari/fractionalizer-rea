import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'

const NotFound404Page = () => {
  return (
    <div class="container-fluid d-flex flex-column pt-5">
      <PageHeader title="404" description="Page not found ." />
      <div className="row d-flex flex-column justify-content-center align-items-center mt-5" >
        <img src="/images/404_notFound.webp" alt="Home" class="rounded mx-auto d-block custom-img-container" />
        <Link class="btn btn-primary col-6 col-md-5 col-lg-4 col-xl-3 mt-5" type="button" to="/marketplace" >
          Return to Marketplace
        </Link>
      </div>
    </div>
  )
}

export default NotFound404Page