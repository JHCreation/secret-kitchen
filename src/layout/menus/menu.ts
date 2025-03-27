
import { Beer, Wine, Utensils, } from 'lucide-svelte';
import Glen from '../icons/Glen.svelte';
import { countryCode } from '../stores.svelte';


export const menuType= {
  tapas: { name: 'Food', icon: Utensils, link: '/tapas' },
  wine: { name: 'Wine', icon: Wine, link: '/wine' },
  beer: { name: 'Beer', icon: Beer, link: '/beer' },
  liqueur: { name: 'Whiskey', icon: Glen, link: '/liqueur' },
}
export const wineType= {
  red: {
    type: 'red',
    name: '레드',
    bgclass: "bg-red-800",
  },
  white: {
    type: 'white',
    name: '화이트',
    bgclass: "bg-green-400",
  },
  rose: {
    type: 'rose',
    name: '로제',
    bgclass: "bg-pink-500",
  },
  sparkling: {
    type: 'sparkling',
    name: '스파클링',
    bgclass: "bg-blue-500",
  },
  natural: {
    type: 'natural',
    name: '내추럴',
    bgclass: "bg-slate-500",
  },
  port: {
    type: 'port',
    name: '포트',
    bgclass: "bg-slate-700",
  },
}

function processItem(item:any) {
  try {
    return JSON.parse(item);
  } catch (error) {
    return item ? [item] : null;
  }
}

export const getDataFromId= ({list, key, id})=> {
  // const { id, key }= params as any
  // const data= list[key].find(o=> o[`${key}_id`] == id )
  // const info= getMenuInfo(key, data)
  const data= list[key].find(o=> o[`id`] == id )
  const info= data
  return { data, info }
}
export const getMenuInfo= (key:string, data:any)=> {
  const keyNo= data[`${key}_key`];
  const id= data[`${key}_id`];
  const subject= data[`${key}_subject`];
  let country= data[`${key}_country`]
  try {
    country= JSON.parse(country)
  } catch (error) {
    
  }
  // const unsubscribe =  countryCode.subscribe((countryList)=>{
  //   countryInfo= country.map(ctr => {
    
  //     console.log(countryList,countryList?.[ctr])
  //   })
  // })
  // // unsubscribe()
  // /* country.map(ctr => {
    
  //   console.log(countryCode, countryCode[ctr])
  // }) */
  // console.log(countryInfo)
  const name= data[`${key}_name`];
  const volume= data[`${key}_volume`];
  const abv= data[`${key}_abv`];
  const regex= new RegExp(`\\/data\\/${key}`)
  const imgs= JSON.parse(data[`${key}_doc`])
  const isPath= regex.test(data[`${key}_doc`])
  let priceOption= data[`${key}_price_option`]
  try {
    priceOption= JSON.parse(priceOption)
  } catch (error) { }
  // console.log(priceOption)
  
  const images= !imgs ? [`/img/logo/logo-square.svg`] : 
  imgs.map(img=> (isPath ? img : `/data/${key}/${data[`${key}_id`]}/${key}_doc/${img}`))

  const thumbImg= imgs ? (isPath ? imgs[0] : `/data/${key}/${data[`${key}_id`]}/${key}_doc/${imgs[0]}`) : ''
  const thumb= !imgs ? `/img/logo/logo-square.svg` : `${import.meta.env.VITE_PUBLIC_URL}${thumbImg}`
  
  const type= processItem(data[`${key}_item_1`])
  const type2= processItem(data[`${key}_item_2`])
  const priceNum= Number(data[`${key}_price`]*1000)
  const salePriceNum= data[`${key}_sale_price`] ?  Number(data[`${key}_sale_price`]*1000) : null
  const price= priceNum.toLocaleString()
  const salePrice= salePriceNum ?  salePriceNum.toLocaleString() : null
  const contents= data[`${key}_contents`]
  const payPrice= salePrice || price
  const payPriceNum= salePriceNum || priceNum
  // const salePrice= '12,000'
  return {
    key, keyNo, id, name, imgs, thumb, type, price, salePrice, volume, abv,
    subject, country, type2, priceNum, salePriceNum, contents, images, priceOption, payPrice, payPriceNum
  }
}