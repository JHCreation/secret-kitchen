<script lang="ts">
  import Loading from "~/components/ui/Loading.svelte";
  import { menuState } from "../../stores.svelte";
  import Item from "./Item.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { getDataFromId, wineType } from "../menu";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import _ from "lodash";
  import { onMount } from "svelte";
  import ComboBox from "../wine/ComboBox.svelte";
  import { Grid2x2 } from "lucide-svelte";
  import clsx from 'clsx';
  import { Columns4 } from "lucide-svelte";
  import { Columns2 } from "lucide-svelte";
  import { Columns3 } from "lucide-svelte";
  import { navigate, useLocation } from "svelte-routing";
  import queryString from "query-string";
  import { handlerDetailOpen, onDetailOpen } from "../menu_store.svelte";
  import MenuGrid from "./MenuGrid.svelte";
  
  let { id, type='all' }= $props()
  let list= $derived($menuState?.[id] ?? [])
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




  const filterStyle= ({id, list, type, typeKey}) => {
    console.log('filterssss', list)
    if( id != 'wine' ) {
      return list
    }
    if( type == 'all' ) {
      return list
    }
    
    return list.filter(o=> {
    
      let types= o[`${id}_${typeKey}`]
      try {
        types= JSON.parse(types)
      } catch (error) {
        
      }
      if(_.isArray(types) && types.find(t=> t == type)) {
        return true
      }
      // console.log(wineStyle)
      return types == type
    })
  }
  let filterList= $derived(filterStyle({id, list, type, typeKey: 'item_1'}))

  let grid= $state(4)
  let loading= $state(false)
  const location= useLocation()
  console.log(location)
  $effect(() => {
    // if(id) {
      // loading= true 
      // setTimeout(e=> loading= false, 300)
      // wineStyle ='all'
      // if( id == 'beer') { grid= 3 }
      // if( id == 'wine') { grid= 4 }
    // }
    const params= queryString.parse($location.search)
    if( params?.id && params?.key && $menuState ) {
      const { id, key }= params as any
      const { data, info }= getDataFromId({ list: $menuState, key, id })
      onDetailOpen({key, data, info})
    } else {
      handlerDetailOpen(false)
    }
  });


  $inspect(id, list)
  
</script>

{#if loading}
  <div class="w-full min-h-[calc(100dvh-61px)] flex items-center justify-center">
    <div class="w-24">
      <Loading />
    </div>
  </div>
{/if}

{#if !loading }
  <div class="my-20 px-1">

    {#if id=='wine'}
      <!-- <ComboBox /> -->
      <div class="sticky top-2 left-0 px-0 z-10">
        
        <ScrollArea
          class="w-full whitespace-nowrap mb-4 "
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

    {/if}
    
    <!-- <div class="block md:hidden">
      <button>
        {#if grid == 3}
          <Columns4 onclick={()=> grid = 4} size={18} class="text-slate-400"/>
        {/if}
        
        {#if grid == 4}
          <Columns3 onclick={()=> grid = 3} size={18} class="text-slate-400"/>
        {/if}
      </button>
    </div> -->
    <MenuGrid id={id} list={filterList} />
    <!-- {#if $menuState}

      {#if filterList.length > 0}
        <div class={`grid justify-center 
          ${clsx({ 
            'grid-cols-4 md:grid-cols-[repeat(auto-fill,115px)]': grid==4, 
            'grid-cols-3 md:grid-cols-[repeat(auto-fill,115px)]': grid==3, 
          }) }  gap-1 md:gap-2`}
        >
          {#each filterList as data}
            <Item key={id} data={data} />
          {/each}
        </div>
      {/if}

    {:else}
      <div class="w-full min-h-96 flex items-center justify-center">
        <div class="w-24">
          <Loading />
        </div>
      </div>
    {/if} -->

  </div>
{/if}