<script lang="ts">
  import MenuGrid from "../item/MenuGrid.svelte";
  import Loading from "~/components/ui/Loading.svelte";
  import { menuState, menuList, countryData, activeCountry } from "../../stores.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { getDataFromId, getMenuInfo, menuType, wineType } from "../menu";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import _ from "lodash";
  import { onMount } from "svelte";
  import ComboBox from "./ComboBox.svelte";
  import { navigate, useLocation } from "svelte-routing";
  import MenuWrap from "../MenuWrap.svelte";
  import { wineFilters, wineSort } from "./wineStore.svelte";
  import type { WineSortType } from "./wineStore.svelte";
  import OrderBy from "./OrderBy.svelte";
  import { Dot } from "lucide-svelte";
  import ItemNotice from "../_com/ItemNotice.svelte";
  
  
  let { type='all' }= $props()
  const id= 'wine';
  let list= $derived($menuState?.[id] ?? [])
  $effect(()=> {
    // console.log($wineFilters)
    if( type ) wineFilters.update(ft=> ({ ...ft, type }) )
  })
  /* const filterStyle= ({id, list, wineStyle, type, typeKey}) => {
    
    if( id != 'wine' ) {
      return list
    }
    if( wineStyle == 'all' ) return list
    return list.filter(o=> {
    
      let types= o[`${id}_${typeKey}`]
      try {
        types= JSON.parse(types)
      } catch (error) {
        
      }
      if(_.isArray(types) && types.find(t=> t == wineStyle)) {
        return true
      }
      // console.log(wineStyle)
      return types == wineStyle
    })
  }
  let filterList= $derived(filterStyle({id, list, wineStyle, type, typeKey: 'item_1'})) */
  /* let filters= $state<any>({
    type,
    country: 'all'
  }) */

  const setCountry= (code)=> {
    wineFilters.update(ft=> ({ ...ft, country: code }) )
  }
  
  

  const filterStyle= ({id, list, filters, sort}) => {
    // console.log(_.orderBy(list, [null], [null]))
    const sortKeys= _.map(sort, 'key');
    const sortTypes= _.map(sort, 'type');
    const orderList= _.orderBy(list, sortKeys, sortTypes)
    // console.log(filters, orderList, sortKeys, sortTypes)
    const filterList= orderList.filter(o=> {
      const info= o
      // const info= getMenuInfo(id, o)

      const filterCheck= {}
      const filterKeys= Object.keys(filters)
      filterKeys.map(key=> filterCheck[key]= false)
      
      const res= filterKeys.some(key=> {
        if( filters[key] == 'all' ) filterCheck[key]= true
        if(_.isArray(info[key]) && info[key].find(t=> t == filters[key])) {
          filterCheck[key]= true
        }
        if( info[key] == filters[key] ) filterCheck[key]= true
        return filterCheck[key] == false
      })

      return !res
    })
    
    return filterList
  }

  let filterList= $derived(filterStyle({id, list, filters: $wineFilters, sort: $wineSort }))
  
  let grid= $state(4)
  let loading= $state(false)
  
  let countList= $derived($activeCountry.find(o=> o.key == id).country)
  // $inspect('필터', $wineFilters)

  $inspect(id, list, filterList)
  
  const setSort = (sort:WineSortType)=> {
    let isDupl= false;
    wineSort.update((wine_sort)=> {
      console.log(wine_sort, sort)
      if( !sort ) return wine_sort
      const sorted= wine_sort.map(s=> {
        if( s.key == sort.key ) {
          isDupl= true
          return !sort.type ? {...sort, key: null} : sort
        }
        return s
      })
      return isDupl ? sorted : sorted.concat(sort)
    })
  }

  const notice= [
    { msg: '드시다가 남은 와인은 포장해드려요.' },
    // { msg: '테이크아웃시 할인 적용됩니다. -8,000원' },
  ]
</script>




<MenuWrap>
  <div class="mb-4 border- w-full max-w-[400px] mx-auto p-3 rounded-sm">
    <h1 class="font-[family-name:var(--font-type-en)] text-center text-5xl leading-[1.6]">{menuType[id].name}</h1>
    <ItemNotice notice={notice}/>
    
  </div>
  <div class="sticky top-2 left-0 px-0 z-10">
          
    <ScrollArea
      class="w-full whitespace-nowrap mb-0 "
      orientation="horizontal"
    >
      <Tabs.Root bind:value={type} class="w-full">
        <Tabs.List >
          <Tabs.Trigger 
            onclick={()=> {
              navigate(`/menus/${id}`, { preserveScroll: true })
              // wineStyle= 'all'
            }} 
            value={'all'} class="text-xs md:text-sm w-18 md:w-24" 
          >전체</Tabs.Trigger>
          {#each Object.keys(wineType) as type}
            <Tabs.Trigger 
              onclick={()=> {
                navigate(`/menus/${id}/${type}`, { preserveScroll: true })
                // wineStyle= type
              }} 
              value={type} class="text-xs md:text-sm w-18 md:w-24" 
            >{wineType[type].name}</Tabs.Trigger>
          {/each}
        </Tabs.List>
      
      </Tabs.Root>
      
    </ScrollArea>
  </div>
  <div class="my-2 w-full flex justify-">
    <ComboBox id={id} list={countList} setCountry={setCountry} filters={$wineFilters}/>
    <div class="ml-1 flex gap-1">
      <OrderBy id={id} key={'payPriceNum'} sort={$wineSort} setSort={setSort} label={'가격순'} className="" />

      <!-- <OrderBy id={id} key={'name'} sort={$wineSort} setSort={setSort} label={'이름순'} /> -->
    </div>
  </div>
    
  <div class="">
    <MenuGrid id={id} list={filterList} />
  </div>
</MenuWrap>