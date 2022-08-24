import SubmitPropertyForm from '../components/submit-property/SubmitPropertyForm'
import ImageCarouselItems from '../components/layout/ImageCarouselItems'
import ImageCarousel from '../components/layout/ImageCarousel'
import PageHeader from '../components/layout/PageHeader'
import { userLogedIn } from '../components/utilities'
import { Navigate } from 'react-router-dom'
import { SubmitPropertyImagesContextProvider } from '../contexts/SubmitPropertyImages'

const SubmitPropertyPage = () => {

  if (!userLogedIn())
    return <Navigate to="/" replace />

  return (
    <div className="container-fluid d-flex flex-column pt-5">
      <PageHeader title="New Property" description="Submit new property, so other people can buy stocks ." />
      <div className="row d-flex flex-column flex-sm-row justify-content-between align-items-center mt-5" >
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100" >
            <SubmitPropertyImagesContextProvider>
              <div className="col-md-9 col-lg-6 col-xl-5 mb-5">
                <ImageCarousel>
                  <ImageCarouselItems />
                </ImageCarousel>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mb-5 px-auto">
                <SubmitPropertyForm />
              </div>
            </SubmitPropertyImagesContextProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitPropertyPage