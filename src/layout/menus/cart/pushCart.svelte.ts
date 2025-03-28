import { getByteSize, getRandomNumber } from "~/components/utils/util"
import { menuType } from "../menu"
import { cartState, cartStateList } from "~/layout/stores.svelte"

interface CartProdType {
  name: string
  key: string
  price: string
  qty: number
}
export const makeOrderList= ({cartStateList,  tid})=> {
  if (cartStateList) {
    let total= 0
    const prod:CartProdType[]= cartStateList.map(item=> {
      total += (item.payPriceNum * item.qty)
      return {
        name: item.name,
        key: menuType[item.key].name,
        price: item.payPrice,
        qty: item.qty,
        option: item.option
      }
    })

    const data= {
      // title: '주문요청',
      tid,
      prod,
      total: total.toLocaleString()
    }
    return data;
  }
}

export type OrderStatusType= 'use' | 'paid'
interface CreateOrderParam {
  key: string
  content: any
  order_id: string
  // store_id: string
  // table_id: string
  // status: 'use' | 'paid'
}
export const createOrders= async ({ params }: { params: CreateOrderParam })=> {
  console.log(params)
  // return
  const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  const result= await res.json()
  console.log(result)
  return 'success'
}

export interface CreateOrdeGroupParam {
  order_id: string
  store_id: string
  table_id: string
  sale_date: string
  status: OrderStatusType
}
export const createOrderGroup= async ({ params }: { params: CreateOrdeGroupParam })=> {
  console.log(params)
  // return
  const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/order-group`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
  const result= await res.json()
  console.log(result)
  return 'success'
}

export async function pushBulkRun ({ orders }) {
  if (orders) {
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/push-bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify({
        ...orders,
        title: '주문요청!'
      })
    })
    const result= await res.json()  
    console.log(result)
    
    return 'success'
  } else {
    // 구독 정보가 없거나 유효하지 않음
    console.log('구독 정보 없음')
  }
}


export async function pushRun ({cartStateList, subscription}) {
  console.log('subscription', subscription)
  if (subscription) {
    let total= 0
    const prod= cartStateList.map(item=> {
      total += (item.payPriceNum * item.qty)
      return {
        name: item.name,
        key: menuType[item.key].name,
        price: item.payPrice,
        qty: item.qty
      }
    })

    const data= {
      title: '주문요청',
      id: getRandomNumber(1,12),
      prod,
      total: total.toLocaleString()
    }

    const body= { subscription, data }
    
    console.log(cartStateList, data, body, getByteSize(JSON.stringify(body)))
    // return;


    const res= await fetch(`${import.meta.env.VITE_WEBPUSH_URL}/push-bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    console.log(res)
    cartState.set([])
  } else {
    // 구독 정보가 없거나 유효하지 않음
    console.log('구독 정보 없음')
  }
}