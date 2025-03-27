import { writable } from "svelte/store";
import { cartState, cartCurrent } from "../../stores.svelte";
import Cookies from 'js-cookie'

export let cartOpen= writable(false)
export let cartAdd= writable(null)
/* export const addToCart= (key, item)=> {
  // cartAdd= item
  // cartOpen= true
  cartAdd.set(item)
  cartOpen.set(true)
} */
export const handlerCartOpen= (open)=> cartOpen= open


const expireTime= 10 / 86400;
export const removeCart= ({ item })=> {
  cartState.update(cartState=>{
    const ftCart= cartState.filter(o=> o.key != item.key || o.id != item.id || o.option != item.option)
    Cookies.set('cart', JSON.stringify(ftCart), { expires: expireTime })
    return ftCart
  })
}

export interface CartItemType {
  key: string
  id: string
  option: string
  qty: number 
  /* | {
    [key: string]: number
  }[] */
}
export const sortCart= ({cartState, addCart, count}):CartItemType[]=> {
  // const dupl= cartState.find(o=> o.id == addCart.id && o.key == addCart.key)
  // const filters= cartState.filter(o=> o.key != addCart.key || o.id != addCart.id)

  let isDupl= false;
  const res= cartState.map(o=> {
    if( o.id == addCart.id && o.key == addCart.key && o.option == addCart.option) {
      isDupl= true
      const sum= o.qty + count
      return {
        ...o,
        qty: sum <= 1 ? 1 : sum
      }
    }
    return o
  })
  console.log(addCart)
  return isDupl ? res : res.concat({
    key: addCart.key,
    id: addCart.id,
    option: addCart.option,
    price: addCart.price,
    qty: count
  })
  /* if( dupl ) {
    
    const res= [
      {
        ...dupl,
        qty: dupl.qty + count
      },
      ...filters
    ]
    console.log(res)
    return res;
  } else {
    const res= cartState.concat({
      key: addCart.key,
      id: addCart.id,
      qty: count
    })
    return res;
  } */
}


export const saveCart= ({cartCurrent, count})=> {
  // console.log(cartCurrent)
  cartState.update((cartState)=>{
    console.log(cartState)
    const sorted= sortCart({cartState, addCart: cartCurrent, count})
    // console.log(sorted)
    // console.log(data, $cartCurrent)
    // Cookies.set('cart', JSON.stringify(sorted), { expires: expireTime }) 
    return sorted
  })
  // onClose(onOpen)
}

/* export const onClose= (onOpen= null)=> {
  count= 1
  onOpen(false)
} */