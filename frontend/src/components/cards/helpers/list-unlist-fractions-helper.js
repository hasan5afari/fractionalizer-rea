/* global BigInt */
import { openContractCall } from '@stacks/connect'
import { StacksTestnet } from '@stacks/network'
import {
  uintCV,
  makeStandardFungiblePostCondition,
  createAssetInfo,
  FungibleConditionCode,
  AnchorMode,
  makeContractFungiblePostCondition
} from '@stacks/transactions'
import { makePostRequest, makeDeleteRequest, makeGetRequest } from '../../utilities'

const CONTRACT_ADDRESS = 'STJY93CBSR6AC096D3ZQ8A63PYQSM0CG2HZP481M'

const makeRequestList = async (stockId, fractionsCountToList, transactionId) => {

  try {

    const response = await makePostRequest('stocks/list', {
      stockID: stockId,
      fractionsCountToList,
      transactionId
    }, localStorage.getItem('accessToken'))

    return response

  } catch (error) {
    console.log(error)
  }

}

const makeRequestUnlist = async (stockId, transactionId) => {

  try {

    const response = await makeDeleteRequest('stocks/list', {
      stockID: stockId,
      transactionId
    }, localStorage.getItem('accessToken'))

    return response

  } catch (error) {
    console.log(error)
  }
}

const makeContractCallList = async (stockId, fractions) => {

  try {

    const response = await makeGetRequest(`stocks/${stockId}`, {}, localStorage.getItem('accessToken'))

    if (response.status === 200) {

      const result = await response.json()

      const functionArgs = [
        uintCV(result.tokenid),
        uintCV(fractions)
      ]

      const asset = createAssetInfo(
        CONTRACT_ADDRESS, // contract address
        'fractionalizer-rea', // contract name
        'fractions' // fungible token name
      )

      const stxPostConditionFungible = makeStandardFungiblePostCondition(
        result.buyer, // the owner of fractions ( stock )
        FungibleConditionCode.Equal,
        BigInt(fractions),
        asset
      );

      const postConditions = [stxPostConditionFungible]

      const options = {
        contractAddress: CONTRACT_ADDRESS,
        stxAddress: result.buyer.principal,
        contractName: "fractionalizer-rea",
        functionName: "list-fractions",
        network: new StacksTestnet(),
        AnchorMode: AnchorMode.Any,
        postConditions,
        functionArgs,
        appDetails: {
          name: "REA",
          icon: ".",
        },
        onFinish: (TXData) => {
          makeRequestList(stockId, fractions, TXData.txId).then((response) => {
            if (response.status === 201) {
              window.location.reload()
            } else {
              throw new Error('Failed to submit the request .')
            }
          })
        }
      };

      await openContractCall(options);

    } else {
      throw new Error('Failed to get user principal address .')
    }

  } catch (error) {
    console.log(error)
  }

}

const makeContractCallUnlist = async (stockId) => {

  try {

    const response = await makeGetRequest(`stocks/${stockId}`, {}, localStorage.getItem('accessToken'))

    if (response.status === 200) {

      const result = await response.json()

      const functionArgs = [
        uintCV(result.tokenid)
      ]

      const asset = createAssetInfo(
        CONTRACT_ADDRESS, // contract address
        'fractionalizer-rea', // contract name
        'fractions' // fungible token name
      )

      const stxPostConditionFungible = makeContractFungiblePostCondition(
        CONTRACT_ADDRESS,
        'fractionalizer-rea',
        FungibleConditionCode.Equal,
        BigInt(result.fractions),
        asset
      );

      const postConditions = [stxPostConditionFungible]

      const options = {
        contractAddress: CONTRACT_ADDRESS,
        stxAddress: result.buyer.principal,
        contractName: "fractionalizer-rea",
        functionName: "unlist-fractions",
        network: new StacksTestnet(),
        AnchorMode: AnchorMode.Any,
        postConditions,
        functionArgs,
        appDetails: {
          name: "REA",
          icon: ".",
        },
        onFinish: (TXData) => {
          makeRequestUnlist(stockId, TXData.txId).then((response) => {
            if (response.status === 201) {
              window.location.reload()
            } else {
              throw new Error('Failed to submit the request .')
            }
          })
        }
      };

      await openContractCall(options);

    } else {
      throw new Error('Failed to get user principal address .')
    }

  } catch (error) {
    console.log(error)
  }

}

export { makeContractCallList, makeContractCallUnlist }