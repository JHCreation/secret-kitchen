<script lang="ts">
  import Badge from "~/lib/components/ui/badge/badge.svelte";
  import { wineType } from "../../menu";
  import Button from "~/lib/components/ui/button/button.svelte";
  import { ShoppingCart } from "lucide-svelte";
  import { addToCart, countryCode, countryData, tableId } from "~/layout/stores.svelte";
  import _ from "lodash";
  import { Link, navigate, useHistory, useLocation } from "svelte-routing";
  import { attemptParse } from "~/components/utils/util";
  import clsx from "clsx";
  import queryString from "query-string";
    import { twMerge } from "tailwind-merge";
  let { key, data }= $props();
  // let info = data
  let info = $derived(data)
  // let info = $derived(getMenuInfo(key, data))
  
  const location= useLocation()
  
  // let searchParams = new URLSearchParams(window.location.search);
  // searchParams.append('key', key)
  // searchParams.append('id', id)
  let currentQuery = queryString.parse(window.location.search);
  // $inspect(currentQuery)
</script>

{#if info }
  {@const { id, name, imgs, thumb, type, price, salePrice, volume, abv, country, priceOption }= info}
  <!-- {console.log(searchParams.toString())} -->
  {@const countryInfo= attemptParse(country)}
  {@const newParams = { key, id }}
  {@const updatedQuery = { ...currentQuery, ...newParams }}
  {@const newQueryString = queryString.stringify(updatedQuery)}
  {@const linkDetail= `${$location.pathname}?${newQueryString}`}
  <div class="w-full grid grid-rows-[1fr_minmax(min-content,_auto)] p-1 md:p-2 border">
    <Link 
      to={linkDetail} 
      preserveScroll={true}
      replace={false}
      onclick={e=> {
        // onDetailOpen({key, data, info})
      }} 
      class="grid w-full text-left" 
    >
      <div class="relative w-full h-full grid grid-rows-[minmax(min-content,0)_minmax(min-content,auto)]" >
        {#if $countryCode}
          <div class="grid absolute top-0 left-0">
            {#if _.isArray(countryInfo)}
              {#each countryInfo as ctr}
                <!-- {console.log($countryCode[ctr].image)} -->
                <img src={$countryCode[ctr].image} alt="" class="w-4 h-auto">
              {/each}
            {/if}
          </div>
        {/if}
        <div class={`w-full ${clsx({ 
          'h-14 md:h-28': key != 'tapas',
          'aspect-square': key == 'tapas'
        })}`}>
          <img src={`${info.thumb}`} alt="" class={`w-full h-full ${clsx({ 
            'object-contain': key != 'tapas', 
            'object-cover': key == 'tapas' && imgs, 
          }) } `}>
        </div>

        <div class="mt-2 flex flex-col overflow-hidden">

          {#if type }
            <div class="overflow-x-auto w-full flex gap-0.5">
              {#each type as type}
                <Badge class={`text-3xs font-medium text-nowrap px-1 py-0 md:py-0.5 ${wineType[type].bgclass}`}>{wineType[type].name}</Badge>
              {/each}
            </div>
          {/if}
          <div class="font-[family-name:var(--font-type2)] font-extrabold text-xs md:text-sm leading-[0.85rem] md:leading-4 mt-1 line-clamp-2">{name}</div>
          <div class="font-[family-name:var(--font-type2)] flex items-center mt-0 md:mt-1">
            {#if volume}
              <span class="text-3xs md:text-2xs">{volume}</span>
            {/if}
            {#if volume && abv}
            <span class="border-l mx-1 border-slate-400 h-2 block"></span>
            {/if}
            {#if abv}
            <span class="text-3xs md:text-2xs">{abv}</span>
            {/if}

          </div>

          <div class="flex-1 flex flex-col justify-end">
            
            <div class="flex">
              <div class="w-full bg-slate-200 px-2 py-0.5 md:py-1 rounded-lg text-center mt-1 font-[family-name:var(--font-type2)] row-auto">
                {#if priceOption}
              
                  {#each priceOption as option}
                    <p class="border-slate-500 text-slate-900 flex flex-col items-start">
                      <span class="text-3xs">{option.key} .</span>
                      <!-- <span class="text-2xs">.</span> -->
                      <span class="text-2xs font-bold leading-3">{ Number(option.value*1000).toLocaleString()}원</span>
                    </p>
              
              
                  {/each}
                {:else}
                  {#if salePrice}
                    <div class="border-slate-500 text-slate-400 text-3xs leading-3 line-through">{price}원</div>
                    <div class="border-slate-500 text-slate-600 text-2xs md:text-sm leading-3 font-bold">{salePrice}원</div>
                  {:else}
                    <div class="border-slate-500 text-slate-900 text-2xs md:text-sm leading-4 font-bold">{price}원</div>
                  {/if}
              
                {/if}
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </Link>
    
    <div class="mt-1 grid-rows-1 grid grid-flow-col gap-0.5">
      <!-- <Button onclick={e=> {
        navigate(linkDetail, { preserveScroll: true })
        // onDetailOpen({key, data, info})
      }} class="p-1 md:p-1 text-2xs h-auto bg-gray-600">보기</Button> -->
      {#if $tableId}
        <Button onclick={e=> addToCart({key, data, info})} class="bg-c0 p-1 md:p-1  h-auto">
          <ShoppingCart class="!w-3 !h-3 md:!w-4 md:!h-4 stroke-[3]"/>
        </Button>
      {/if}
      
    </div>
  </div>
{/if}