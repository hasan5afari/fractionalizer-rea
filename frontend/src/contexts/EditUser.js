import { createContext, useState } from 'react'

const EditUserContext = createContext({
  image: '',
  fullname: '',
  address: '',
  currentPassword: '',
  newPassword: '',
  updateImage: () => { },
  updateFullName: () => { },
  updateAddress: () => { },
  updateCurrentPassword: () => { },
  updateNewPassword: () => { }
})

export const EditUserContextProvider = (props) => {

  const [userImage, setUserImage] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userCurrentPassword, setUserCurrentPassword] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')

  const updateImageHandler = (newImage) => {
    setUserImage(() => newImage)
  }

  const updateFullNameHandler = (newFullName) => {
    setUserFullName(() => newFullName)
  }

  const updateAddressHandler = (newAddress) => {
    setUserAddress(() => newAddress)
  }

  const updateCurrentPasswordHandler = (currentPassword) => {
    setUserCurrentPassword(() => currentPassword)
  }

  const updateNewPasswordHandler = (newPassword) => {
    setUserNewPassword(() => newPassword)
  }

  const context = {
    image: userImage,
    fullname: userFullName,
    address: userAddress,
    currentPassword: userCurrentPassword,
    newPassword: userNewPassword,
    updateImage: updateImageHandler,
    updateFullName: updateFullNameHandler,
    updateAddress: updateAddressHandler,
    updateCurrentPassword: updateCurrentPasswordHandler,
    updateNewPassword: updateNewPasswordHandler
  }

  return (
    <EditUserContext.Provider value={context}>
      {props.children}
    </EditUserContext.Provider>
  )
}

export default EditUserContext