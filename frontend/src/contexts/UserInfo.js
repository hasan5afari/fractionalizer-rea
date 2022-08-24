import { createContext, useState } from 'react'

const UserInfoContext = createContext({
  image: '',
  fullname: '',
  username: '',
  updateImage: () => { },
  updateFullName: () => { },
  updateUsername: () => { },
})

export const UserInfoContextProvider = (props) => {

  const [userImage, setUserImage] = useState(localStorage.getItem('userImage'))
  const [userFullName, setUserFullName] = useState(localStorage.getItem('userFullName'))
  const [userUsername, setUserUsername] = useState(localStorage.getItem('userUsername'))

  const updateImageHandler = (newImage) => {
    setUserImage(() => {
      localStorage.setItem('userImage', newImage)
      return newImage
    })
  }

  const updateFullNameHandler = (newFullName) => {
    setUserFullName(() => {
      localStorage.setItem('userFullName', newFullName)
      return newFullName
    })
  }

  const updateUsernameHandler = (newUsername) => {
    setUserUsername(() => {
      localStorage.setItem('userUsername', newUsername)
      return newUsername
    })
  }

  const context = {
    image: userImage,
    fullname: userFullName,
    username: userUsername,
    updateImage: updateImageHandler,
    updateFullName: updateFullNameHandler,
    updateUsername: updateUsernameHandler,
  }

  return (
    <UserInfoContext.Provider value={context}>
      {props.children}
    </UserInfoContext.Provider>
  )
}

export default UserInfoContext