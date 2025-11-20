import { writable, derived } from 'svelte/store';
// import { useLocation } from 'svelte-routing';
import _ from 'lodash'
import Cookies from 'js-cookie'
import { getMenuInfo } from './menus/menu';
import { countryNames } from '~/components/utils/countryNames';
import { attemptParse } from '~/components/utils/util';
// import queryString from "query-string";

export const bottomNavEl= writable(null)
export const langlist= $state([ "ko", "en" ]);
export const lang = writable("ko");
// const location= useLocation()
// console.log(location)
const path = window.location.pathname;
const curretLang= langlist.find(lang=> lang == path.split("/")[1])
lang.set(!curretLang ? 'ko' : curretLang)
export const langState = derived(lang, $lang => {
  console.log($lang)
  return {
    lang: $lang,
    path: $lang=="ko" ? '' : `/${$lang}`,
    toggle: $lang=="ko" ? 'english' : 'korean',
    togglePath: $lang=="ko" ? 'en' : '',
  }
});



export const menuInit= writable<any>(null)
export const menuState= writable<any>(null)
export const menuList= derived(menuInit, $menuInit => {
  // console.log($menuInit)
  const res:any= {}
  if( $menuInit ){
    // console.log(menuInit)
    Object.keys($menuInit).map(key=> {
      const info= $menuInit[key].map(d=> getMenuInfo(key, d) )
      console.log('info', $menuInit[key], info)
      res[key]= _.shuffle($menuInit[key])
    })
  }
  
  return res
})
/* fetch(`${import.meta.env.VITE_API_URL}/bio_get_category`)
.then(res=> {
  const data= res.json()
  const group= _.groupBy(data, 'categoryName')
  console.log(res, data, group)
  bioState.set(res.json())
})
.catch(e=> console.log(e))
 */
const fetchMenu= async ()=> {
  const res= await fetch(`${import.meta.env.VITE_API_URL}/domain/menus/get_menus?public=public`)
  const data= await res.json()  
  menuInit.set(data)
  const random:any= {}
  Object.keys(data).map(key=> {
    const info= data[key].map(d=> getMenuInfo(key, d) )
    
    if( key == 'liqueur' ) {
      console.log('liqueur', info)
      const [drinkItems, otherItems] = _.partition(info, item => item.name.includes('[음료]'));
      console.log('drinkItems', drinkItems, otherItems)
      random[key]= [..._.shuffle(otherItems), ..._.shuffle(drinkItems)]
    }
    else if( key == 'tapas' ) random[key]= info
    else random[key]= _.shuffle(info)
    // console.log('info', data[key], info)
    // if( key == 'tapas' ) random[key]= data[key]
    // else random[key]= _.shuffle(data[key])
  })
  console.log(data, random)
  menuState.set(random)
  
}
fetchMenu()


let initCartState;
try {
  initCartState= JSON.parse(Cookies.get('cart'))
} catch (error) {
  initCartState= []
}
// console.log(initCartState)
export const cartState= writable<any>(initCartState)
export const cartStateList= derived<any, any>([menuInit, cartState], ([$menuInit, $cartState]:any, set)=> {
  if( $menuInit ){
    const list= $cartState.map(cart=> {
      const {key, id, option, qty}= cart
      const res= $menuInit[key].find(o=> o[`${key}_id`]==cart.id)
      const info= getMenuInfo(key, res)
      // console.log(info, option)
      const payPriceInfo= {
        payPriceNum: info.salePriceNum || info.priceNum,
        payPrice: info.salePrice || info.price
      }
      
      const options= {
        optionPriceNum: null,
        optionPrice: null
      }
      if( option && info.priceOption ) {
        options.optionPriceNum= Number(info.priceOption.find(o=> o.key == option).value*1000)
        options.optionPrice= options.optionPriceNum.toLocaleString()

        payPriceInfo.payPriceNum= Number(info.priceOption.find(o=> o.key == option).value*1000)
        payPriceInfo.payPrice= options.optionPriceNum.toLocaleString()
        
      }
      return { ...info, option, qty, ...options, ...payPriceInfo }
    })
    set(list)
  }
})
export const cartOpen= writable<any>(false)
export const cartCurrent= writable<any>(null)
// export const cartCurrentData= writable<any>(null)
export const addToCart= ({key, data, info})=> {
  // console.log(cartState, info)
  // const item= getMenuInfo(key, data)
  // const data= {
  //   key,
  //   value: item
  // }
  // cartState.update((cartState)=> console.log(cartState))
  cartOpen.set(true)
  // cartCurrentData.set(data)
  /* const qty= info.priceOption ? info.priceOption.map((opt, i)=> {
    return {
      key: opt.key,
      qty: i==0 ? 1 : 0 } 
  }) : 1
  console.log(qty) */
  const option= info?.priceOption ? info?.priceOption[0].key : null
  cartCurrent.set({...info, option, qty :1})
}

export const cartStateOpen= writable<any>(false)

export const countryData= writable<any>(null)
export const countryCode= writable<any>(null)
const fetchCountry= async ()=> {
  const res= await fetch('//cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json')
  const data= await res.json()
  countryData.set(data)
  countryCode.set(_.keyBy(data, 'code'))
}

export const activeCountry= derived([countryCode,menuInit], ([$countryCode,$menuInit])=> {
  if($countryCode && $menuInit) {
    const activatedCtr= Object.keys($menuInit).map(key=> {
      let list= []
      $menuInit[key].map(val=> {
        const arr= attemptParse(val[`${key}_country`])
        list= _.union(list, arr)
      })
      const country= list.map( code=> ({
        ...$countryCode[code],
        ...countryNames[code]
      }))
      return {
        key,
        country: _.sortBy(country, 'CountryNameKR')
      }
    })
    return activatedCtr
  }
})

fetchCountry()


type OrdersType= {
  id: string,
  list: any[]
}
export const tableId= writable<string>(null)
export const storeId= writable<string>('kuk')
export const orderId= writable<string>(null)
export const orders= writable<OrdersType>(null)
export const noPush= writable<boolean>(false)
export const saleDate= writable<string>()
export const getOrderId= async (qryStr)=> {
  const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/order-group?${qryStr}`)
  if( res.status == 200 ) {
    const orderList= await res.json()
    orders.set(orderList)
    return orderList
  }
  return null
}

