import ImageCarousel from '../layout/ImageCarousel'
import ImageCarouselItems from '../layout/ImageCarouselItems'

const PropertyImages = (props) => {
  return (
    <div className="card custom-card mb-1">
      <div className="card-body text-center">
        <ImageCarousel>
          <ImageCarouselItems images={props.images} />
        </ImageCarousel>
      </div>
    </div>
  )
}

export default PropertyImages