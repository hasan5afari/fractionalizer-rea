import NavigationItem from '../layout/navigation-tabs/NavigationItem'
import NavigationTabs from '../layout/navigation-tabs/NavigationTabs'
import NavigationContents from '../layout/navigation-tabs/NavigationContents'
import NavigationItemContent from '../layout/navigation-tabs/NavigationItemContent'
import RequestCard from '../cards/RequestCard'

const ProfileStocks = (props) => {
  return (
    <>
      <NavigationTabs>
        <NavigationItem activeTab={true} tabId="all-requests" tabContentId="all-requests-content" tabName="All" />
        <NavigationItem activeTab={false} tabId="pending-requests" tabContentId="pending-requests-content" tabName="Pending" />
      </NavigationTabs>

      <NavigationContents>
        <NavigationItemContent tabContentId="all-requests-content" activeContent={true}>
          {props.allRequests.map((request, index) => {
            return <RequestCard key={index} request={request} />
          })} 
        </NavigationItemContent>
        <NavigationItemContent tabContentId="pending-requests-content" activeContent={false}>
          {props.pendingRequests.map((request, index) => {
            return <RequestCard key={index} request={request} />
          })} 
        </NavigationItemContent>
      </NavigationContents>
    </>
  )
}

export default ProfileStocks