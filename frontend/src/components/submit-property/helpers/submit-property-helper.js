import { openContractCall } from '@stacks/connect'
import { StacksTestnet } from '@stacks/network'
import {
  uintCV,
  stringAsciiCV,
  AnchorMode
} from '@stacks/transactions'
import { makePostRequestFormData, makeGetRequest } from '../../utilities'

const CONTRACT_ADDRESS = 'STJY93CBSR6AC096D3ZQ8A63PYQSM0CG2HZP481M'

const makeRequest = async (name, description, price, fractions, propertyInfo, images, transactionId) => {

  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)
  formData.append('price', price)
  formData.append('fractions', fractions)
  formData.append('transactionId', transactionId)
  formData.append('files', propertyInfo)
  for (const image of images) {
    formData.append('files', image)
  }

  try {

    const response = await makePostRequestFormData('properties/submit', formData, localStorage.getItem('accessToken'))
    return response

  } catch (error) {
    console.log(error)
  }

}

const makeContractCall = async (name, description, price, fractions, propertyInfo, images, data, uri) => {

  try {

    const response = await makeGetRequest('users/profile/get-principal', {}, localStorage.getItem('accessToken'))

    if (response.status === 200) {

      const result = await response.json()

      const functionArgs = [
        uintCV(price),
        uintCV(fractions),
        stringAsciiCV(data),
        stringAsciiCV(uri)
      ]

      const options = {
        contractAddress: CONTRACT_ADDRESS,
        stxAddress: result.principal,
        contractName: "fractionalizer-rea",
        functionName: "submit-property",
        network: new StacksTestnet(),
        AnchorMode: AnchorMode.Any,
        functionArgs,
        appDetails: {
          name: "REA",
          icon: ".",
        },
        onFinish: (TXData) => {
          makeRequest(name, description, price, fractions, propertyInfo, images, TXData.txId).then((response) => {
            if (response.status === 201) {
              window.location.replace('/users/profile')
            } else {
              throw new Error('Failed to submite request .')
            }
          })
        }
      };

      await openContractCall(options);

    } else {
      throw new Error('Failed to get user principal .')
    }

  } catch (error) {
    console.log(error)
  }

}

export { makeContractCall }