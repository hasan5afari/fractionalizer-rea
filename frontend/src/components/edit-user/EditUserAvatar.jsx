import { useContext, useRef } from 'react'
import EditUserContext from '../../contexts/EditUser'

const EditUserAvatar = (props) => {

  const imageInputRef = useRef()
  const imageElementRef = useRef()
  const { updateImage } = useContext(EditUserContext)

  const buttonClickHandler = () => {
    imageInputRef.current.click() 
  }

  const avatarChangeHandler = (event) => {
    const files = event.target.files

    if (FileReader && files && files.length) {

      try {
        const fr = new FileReader();
        fr.onload = () => {
          imageElementRef.current.src = fr.result
          updateImage(files[0])
        }
        fr.readAsDataURL(files[0]);
  
      } catch (error) {
        console.log(error)
      }
  
    }
  }

  return (
    <div className="card custom-card my-1">
        <div className="card-body text-center">
          <img src={props.user.image} alt="avatar" className="rounded-circle" style={{width: '150px', height: '150px', objectFit: 'cover'}} ref={imageElementRef} />
          <button className="position-absolute top-0 start-75 translate-middle btn btn-outline-danger badge rounded-pill bg-danger" onClick={buttonClickHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16" >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
            </svg>
            <span className="visually-hidden">change profile image .</span>
          </button>
          <h3 className="lobster-font mt-3 mb-1">{props.user.username}</h3>
          <input type="file" style={{display: 'none'}} onChange={avatarChangeHandler} ref={imageInputRef}></input>
      </div>
    </div>
  )
}

export default EditUserAvatar