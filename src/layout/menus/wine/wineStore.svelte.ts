import { writable } from "svelte/store";


export const wineFilters= writable<any>({
  type: 'all',
  country: 'all',
  
})

export type WineSortType = {
  key: string
  type: 'asc' | 'desc'
}
export const wineSort= writable<WineSortType[]>([])