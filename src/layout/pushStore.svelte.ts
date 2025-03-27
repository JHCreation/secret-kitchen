import { writable, derived } from 'svelte/store';

export const pushSubscriptions= writable<any>(null)

const fetchPushSubcribe= async ()=> {
  const res= await fetch(`${import.meta.env.VITE_WEBPUSH_URL}/subscribe`)
  const data= await res.json()  
  console.log(data)
  const newList= data.list.map(sub=> {
    return JSON.parse(sub?.subscription)
  })
  /* const newData= {
    ...data,
    list: newList
  } */
  pushSubscriptions.set(newList)
}

// fetchPushSubcribe()