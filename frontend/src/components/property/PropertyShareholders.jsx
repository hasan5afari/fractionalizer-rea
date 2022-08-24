import NavigationItem from '../layout/navigation-tabs/NavigationItem'
import NavigationTabs from '../layout/navigation-tabs/NavigationTabs'
import NavigationContents from '../layout/navigation-tabs/NavigationContents'
import NavigationItemContent from '../layout/navigation-tabs/NavigationItemContent'
import PropertyListedStocksList from './PropertyListedStocksList'
import PropertyUnlistedStocksList from './PropertyUnlistedStocksList'

const PropertyShareholders = (props) => {
  return (
    <>
      <NavigationTabs>
        <NavigationItem activeTab={true} tabId="unlisted-stocks" tabContentId="unlisted-stocks-content" tabName="Unlisted" />
        <NavigationItem activeTab={false} tabId="listed-stocks" tabContentId="listed-stocks-content" tabName="Listed" />
      </NavigationTabs>

      <NavigationContents>
        <NavigationItemContent tabContentId="unlisted-stocks-content" activeContent={true}>
          <PropertyUnlistedStocksList property={props.property} />
        </NavigationItemContent>
        <NavigationItemContent tabContentId="listed-stocks-content" activeContent={false}>
          <PropertyListedStocksList property={props.property} />
        </NavigationItemContent>
      </NavigationContents>
    </>
  )
}

export default PropertyShareholders