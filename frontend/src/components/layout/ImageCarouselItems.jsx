import { useContext } from 'react'
import SubmitPropertyImagesContext from '../../contexts/SubmitPropertyImages'

const ImageCarouselItems = (props) => {
  const { images } = useContext(SubmitPropertyImagesContext)

  return (
    <>
      {props.images && props.images.map((image, index) => {
        return (
          <div key={index} className={'carousel-item' + ((!index) ? ' active' : '')}>
            <img src={props.images[index]} className="d-block w-100" style={{height: '400px', width: '100%'}} alt="..." />
          </div>
        )
      })}
      {!props.images && images.map((image, index) => {
        return (
          <div key={index} className={'carousel-item' + ((!index) ? ' active' : '')}>
            <img src={images[index]} className="d-block w-100" style={{height: '400px', width: '100%'}} alt="..." />
          </div>
        )
      })}
      {(!props.image && !images) &&
        (
          <div key={0} className={'carousel-item active'}>
            <img src="/images/property_vector.png" className="d-block w-100" style={{height: '400px', width: '100%'}} alt="..." />
          </div>
        )
      }
    </>
  )
}

export default ImageCarouselItems