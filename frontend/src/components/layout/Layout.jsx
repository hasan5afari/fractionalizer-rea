import { UserInfoContextProvider } from '../../contexts/UserInfo'
import NavigationBar from './NavigationBar'

const Layout = (props) => {
  return (
    <div>
      <UserInfoContextProvider>
        <NavigationBar />
        <main>
          {props.children}
        </main>
      </UserInfoContextProvider>
    </div>
  )
}

export default Layout