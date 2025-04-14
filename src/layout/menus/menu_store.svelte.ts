import { writable } from "svelte/store"

export let detailOpen= writable(false)
export let detailData= writable(null)
export const setDetailData= (item)=> {
  detailData.set(item)
  // detailData= item
}
export const onDetailOpen= ({key, data, info})=> {
  console.log(key, data, info)
  handlerDetailOpen(true)
  setDetailData(info)
}
export const handlerDetailOpen= (open)=> detailOpen.set(open)