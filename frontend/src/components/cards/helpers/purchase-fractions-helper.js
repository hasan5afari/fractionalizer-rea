/* global BigInt */
import { openContractCall } from "@stacks/connect"
import { StacksTestnet } from '@stacks/network'
import {
  uintCV,
  standardPrincipalCV,
  makeStandardSTXPostCondition,
  createAssetInfo,
  FungibleConditionCode,
  AnchorMode,
  makeContractFungiblePostCondition
} from "@stacks/transactions"
import { makePostRequest, makeGetRequest } from "../../utilities"

const CONTRACT_ADDRESS = 'STJY93CBSR6AC096D3ZQ8A63PYQSM0CG2HZP481M'

const makeRequest = async (stockId, fractionsCountToPurchase, transactionId) => {

  try {

    const response = await makePostRequest('stocks/purchase', {
      stockID: stockId,
      fractionsCountToPurchase,
      transactionId
    }, localStorage.getItem('accessToken'))

    return response

  } catch (error) {
    console.log(error)
  }

}

const makeContractCallPurchase = async (stockId, fractions) => {

  try {

    const response = await makeGetRequest(`stocks/${stockId}`, {}, localStorage.getItem('accessToken'))

    if (response.status === 200) {

      const result = await response.json()

      const functionArgs = [
        uintCV(result.tokenid),
        uintCV(fractions),
        standardPrincipalCV(result.seller)
      ]

      const stxPostCondition = makeStandardSTXPostCondition(
        result.buyer,
        FungibleConditionCode.LessEqual,
        BigInt(Math.floor(result.fractionPrice * fractions * 1e6))
      );

      const asset = createAssetInfo(
        CONTRACT_ADDRESS, // contract address
        'fractionalizer-rea', // contract name
        'fractions' // fungible token name
      )

      const stxPostConditionFungible = makeContractFungiblePostCondition(
        CONTRACT_ADDRESS, // contract address
        'fractionalizer-rea',
        FungibleConditionCode.Equal,
        BigInt(fractions),
        asset
      );

      const postConditions = [stxPostCondition, stxPostConditionFungible]

      const options = {
        contractAddress: CONTRACT_ADDRESS,
        stxAddress: result.buyer.principal,
        contractName: "fractionalizer-rea",
        functionName: "purchase-fractions",
        network: new StacksTestnet(),
        AnchorMode: AnchorMode.Any,
        postConditions,
        functionArgs,
        appDetails: {
          name: "REA",
          icon: ".",
        },
        onFinish: (TXData) => {
          makeRequest(stockId, fractions, TXData.txId).then((response) => {
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

export { makeContractCallPurchase }