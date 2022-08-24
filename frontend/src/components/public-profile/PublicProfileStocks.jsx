import NavigationItem from '../layout/navigation-tabs/NavigationItem'
import NavigationTabs from '../layout/navigation-tabs/NavigationTabs'
import NavigationContents from '../layout/navigation-tabs/NavigationContents'
import NavigationItemContent from '../layout/navigation-tabs/NavigationItemContent'
import UserStockCardPublic from '../cards/UserStockCardPublic'
import UserStockCardPublicForSale from '../cards/UserStockCardPublicForSale'

const PublicProfileStocks = (props) => {
  return (
    <>
      <NavigationTabs>
        <NavigationItem activeTab={true} tabId="unlisted-stocks" tabContentId="unlisted-stocks-content" tabName="Unlisted" />
        <NavigationItem activeTab={false} tabId="listed-stocks" tabContentId="listed-stocks-content" tabName="Listed" />
      </NavigationTabs>

      <NavigationContents>
        <NavigationItemContent tabContentId="unlisted-stocks-content" activeContent={true}>
          {props.unlistedStocks.map((stock) => {
            return <UserStockCardPublic key={stock.id} stock={stock} />
          })}
        </NavigationItemContent>
        <NavigationItemContent tabContentId="listed-stocks-content" activeContent={false}>
          {props.listedStocks.map((stock) => {
            return <UserStockCardPublicForSale key={stock.id} stock={stock} />
          })}
        </NavigationItemContent>
      </NavigationContents>
    </>
  )
}

export default PublicProfileStocks