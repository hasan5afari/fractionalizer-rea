import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { makePatchRequestFormData } from '../utilities'
import EditUserContext from '../../contexts/EditUser'
import UserInfoContext from '../../contexts/UserInfo'
import EditUserAction from './EditUserAction'

const EditUserActionList = () => {

  const navigation = useNavigate()
  const { updateImage, updateFullName, updateUsername } = useContext(UserInfoContext)
  const { image, fullname, address, currentPassword, newPassword } = useContext(EditUserContext)

  const discardChangesHandler = () => {
    navigation('/users/profile', { replace: true })
  }

  const saveChangesHandler = async () => {
    try {

      const formData = new FormData()
      formData.append('fullname', fullname)
      formData.append('address', address)
      formData.append('currentPassword', currentPassword)
      formData.append('newPassword', newPassword)
      formData.append('image', image)
  
      const response = await makePatchRequestFormData('users/profile/edit', formData, localStorage.getItem('accessToken'))
  
      if (response.status === 200) {
        const result = await response.json()
        updateFullName(result.user.fullname)
        updateImage(result.user.image)
        updateUsername(result.user.username)
        navigation('/users/profile', { replace: true })
      }
      else {
        throw new Error('Failed to update user info .')
      }
  
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <EditUserAction onClick={saveChangesHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-check" viewBox="0 0 16 16" >
          <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        </svg>
      </EditUserAction>
    
      <EditUserAction onClick={discardChangesHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-excel" viewBox="0 0 16 16" >
          <path d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 0 1 .064-.704z" />
          <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        </svg>
      </EditUserAction>
    </>
  )
}

export default EditUserActionList