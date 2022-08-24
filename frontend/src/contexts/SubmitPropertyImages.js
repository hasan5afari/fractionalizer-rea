import { createContext, useState } from 'react'

const SubmitPropertyImagesContext = createContext({
  images: [],
  addImage: (newImage) => { },
  removeAllImages: () => { }
})

export const SubmitPropertyImagesContextProvider = (props) => {

  const [propertyImages, setPropertyImages] = useState(['/images/property_vector.png'])

  const addImageHandler = (newImage) => {
    setPropertyImages((prevPropertyImages) => {
      return prevPropertyImages.concat(newImage)
    })
  }

  const removeAllImagesHandler = () => {
    setPropertyImages((prevPropertyImages) => {
      return []
    })
  }

  const context = {
    images: propertyImages,
    addImage: addImageHandler,
    removeAllImages: removeAllImagesHandler,
  }

  return (
    <SubmitPropertyImagesContext.Provider value={context}>
      {props.children}
    </SubmitPropertyImagesContext.Provider>
  )
}

export default SubmitPropertyImagesContext