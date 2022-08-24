import { useRef, useContext, useState } from 'react'
import { makeContractCall } from './helpers/submit-property-helper'
import sha256 from 'sha256'
import SubmitPropertyImagesContext from '../../contexts/SubmitPropertyImages'

const SubmitPropertyForm = () => {

  const nameInputRef = useRef()
  const descriptionInputRef = useRef()
  const priceInputRef = useRef()
  const fractionsInputRef = useRef()
  const [propertyInfo, setPropertyInfo] = useState('')
  const [images, setImages] = useState('')

  const { addImage, removeAllImages } = useContext(SubmitPropertyImagesContext)

  const submitPropertyHandler = async (event) => {
    event.preventDefault()

    try {
  
      const name = nameInputRef.current.value
      const description = descriptionInputRef.current.value 
      const price = priceInputRef.current.value 
      const fractions = fractionsInputRef.current.value

      if (propertyInfo.name.endsWith('.json')) {
        const reader = new FileReader()
        reader.readAsText(propertyInfo, 'UTF-8')
        reader.onload = async (event) => {
          const data = sha256('FLATLAY' + JSON.stringify(event.target.result))
          await makeContractCall(name, description, price, fractions, propertyInfo, images, data, '')
        }
      } else {
        throw new Error('You have to choose a json file .')
      }
  
    } catch (error) {
      console.log(error)
    }
  }

  const infoChangeHandler = (event) => {
    setPropertyInfo(event.target.files[0])
  }

  const imagesChangeHandler = (event) => {
    const files = event.target.files

    if (FileReader && files && files.length) {
      removeAllImages()
      setImages(files)
      try {
        for (let i = 0; i < files.length; i++) {
          const fr = new FileReader();
          fr.onload = function () {
            addImage(fr.result)
          }
          fr.readAsDataURL(files[i]);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form onSubmit={submitPropertyHandler}>
      <div className="form-outline form-floating mb-4">
        <input type="text" className="form-control form-control-md" placeholder="Name of the property" required ref={nameInputRef} ></input>
        <label className="form-label" htmlFor="formPropertyNameInput" >Property Name</label>
      </div>

      <div className="form-outline form-floating mb-4">
        <textarea type="text" className="form-control form-control-md" placeholder="Brief description about property" required ref={descriptionInputRef}></textarea>
        <label className="form-label" htmlFor="formPropertyDescriptionInput">Description</label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input type="number" min="1" className="form-control form-control-md" placeholder="Property Price" required ref={priceInputRef}></input>
        <label className="form-label" htmlFor="formPropertyPriceInput">Property Price</label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input type="number" min="1" className="form-control form-control-md" placeholder="Property Fractions" required ref={fractionsInputRef}></input>
        <label className="form-label" htmlFor="formPropertyStocksInput">Fractions</label>
      </div>

      <div className="form-outline mb-4">
        <label className="text-muted pb-1" htmlFor="formPropertyInfoInput">Property INFO</label>
        <input type="file" className="form-control form-control-md" placeholder="Property information" accept=".json" required onChange={infoChangeHandler}></input>
      </div>

      <div className="form-outline mb-4">
        <label className="text-muted pb-1" htmlFor="formPropertyImagesInput">Property Images</label>
        <input type="file" id="formPropertyImagesInput" className="form-control form-control-md" placeholder="Property information" multiple accept="image/*" required onChange={imagesChangeHandler}></input>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button type="submit" className="btn btn-primary btn-md" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}} >
          Submit Property
        </button>
      </div>
    </form>
  )
}

export default SubmitPropertyForm