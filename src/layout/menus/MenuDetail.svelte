<script lang="ts">
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import ScrollArea from "~/lib/components/ui/scroll-area/scroll-area.svelte";
  import { cartState, cartOpen, cartCurrent, addToCart, countryCode, tableId, bottomNavEl } from "../stores.svelte";
  import { sortCart, saveCart as onSave } from "./cart/cart.svelte";
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import { MoveLeft } from "lucide-svelte";
  import { MoveRight } from "lucide-svelte";
  import Badge from "~/lib/components/ui/badge/badge.svelte";
  import { wineType } from "./menu";
  import { useHistory, navigate, useLocation } from "svelte-routing";
  import _ from "lodash";
  import { attemptParse } from "~/components/utils/util";
  import { ShoppingCart } from "lucide-svelte";
  import { fixSafariNavBug } from "~/layout/nav/Nav.svelte"
    import { onMount } from "svelte";

  

  let { data, open, onOpen, setDetailData}= $props()
  const location = useLocation()
  const onClose= (open)=> {
    onOpen(open)
    
    console.log(window.history.state)
    if(window.history.state) window.history.back();
    else {
      navigate($location.pathname)
    }
    // setTimeout(e=> {
    //   // fixSafariNavBug($bottomNavEl)
    //   document.body.appendChild($bottomNavEl);
    // }, 1000)
    
  }

  const saveCart= (data)=> (e)=> {
    const { key, id }= data
    onSave({cartCurrent: {key, id}, count:1})
    onClose(false)
  }
</script>


<Dialog.Root open={open} onOpenChange={onClose}>
  
  {#if data}
  {@const {name, contents, key, imgs, images, type, volume, abv, salePrice, price, priceOption, country, }= data}
  {@const countryInfo= attemptParse(country)}
  <Dialog.Content class={`sm:max-w-[425px] px-0 py-3 gap-2 ${$cartOpen ? 'opacity-45': ''}`}>
    
    <Dialog.Header class="px-3">
      <Dialog.Title class="font-[family-name:var(--font-type2)]">{name}</Dialog.Title>
      <!-- <Dialog.Description>
        
      </Dialog.Description> -->
    </Dialog.Header>
    <ScrollArea class="my-0 px-3">

      <div class="w-full relative max-h-[calc(100dvh-120px)] ">
        {#if $countryCode}
          <div class="grid absolute top-0 left-0">
            {#if _.isArray(countryInfo)}
              {#each countryInfo as ctr}
                <img src={$countryCode[ctr].image} alt="" class="w-8 h-auto">
              {/each}
            {/if}
          </div>
        {/if}
        <div class="">
          <Splide aria-label={key}
            class="w-full"
            hasTrack={false}
            options={{
              // width : 800,
              drag: images.length > 1 ? 'free' : false,
              snap: true,
              speed: 400,
              perPage: 1,
              gap: 1,
              flickPower: 600,
              flickMaxPages: 1,
              dragMinThreshold: {
                mouse: 0,
                touch: 10,
              },
              arrows: images.length > 1 || false
            }}
          >
            {#if images.length > 1}
            <div class="splide__arrows z-20 h-0 absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center">
              <Button size={'sm'} class="splide__arrow splide__arrow--prev bg-transparent border-slate-600 border text-slate-600 hover:text-slate-200 p-1.5 md:p-2.5 h-auto">
                <MoveLeft />
              </Button>
              <Button size={'sm'} class="splide__arrow splide__arrow--next bg-transparent border-slate-600 border text-slate-600 hover:text-slate-200 p-1.5 md:p-2.5 h-auto">
                <MoveRight />
              </Button>
            </div>
            {/if}
            <SplideTrack class="">
              {#each images as img}
                <!-- {@const info= getMenuInfo(key, data)} -->
                <!-- {@const { name, imgs, url, type, price, salePrice, volume, abv, }= info} -->
                 {@const src= imgs ? `${import.meta.env.VITE_PUBLIC_URL}${img}` : img }
                <SplideSlide class="flex ">
                  <div class="w-full max-h-[200px] mx-auto py-4">
                    <img src={src} alt="" class="w-full h-full object-contain">
                  </div>
                  
                </SplideSlide>
              {/each}
            </SplideTrack>
          
          </Splide>
          
        </div>

        <div class="">
          {#if type }
            <div class="overflow-x-auto w-full flex gap-0.5">
              {#each type as type}
                <Badge class={`text-3xs font-medium text-nowrap px-1 py-0 md:py-0.5 ${wineType[type].bgclass}`}>{wineType[type].name}</Badge>
              {/each}
            </div>
          {/if}
          <!-- <div class="text-xs md:text-sm font-extrabold leading-3 md:leading-4 mt-1 line-clamp-2">{name}</div> -->

          {#if volume || abv }
            <div class="font-['Wanted_Sans_Variable'] flex items-center mt-0 md:mt-1">
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
          {/if}

          <div class="flex-1 flex ">
            <div class="bg-slate-200 px-2 py-0.5 md:py-1 rounded-lg text-center mt-1 font-[family-name:var(--font-type2)] row-auto">

              {#if priceOption}
                <div class="">
                  {#each priceOption as option}
                    <p class="border-slate-500 text-slate-900 py-0.5 flex items-end">
                      <span class="text-2xs mr-1">{option.key}.</span>
                      <span class="text-xs font-bold leading-3">{ Number(option.value*1000).toLocaleString()}원</span>
                    </p>
                  
                  {/each}
                </div>
              {:else}
                {#if salePrice}
                  <div class="border-slate-500 text-slate-400 text-2xs leading-3 line-through">{price}원</div>
                  <div class="border-slate-500 text-slate-600 text-xs md:text-sm leading-3 font-bold">{salePrice}원</div>
                {:else}
                  <div class="border-slate-500 text-slate-900 text-xs md:text-sm leading-4 font-bold">{price}원</div>
                {/if}
              {/if}


            </div>
          </div>
        </div>

        <div class="text-xs mt-4 font-[family-name:var(--font-type2)]">
          {@html contents}
        </div>
      </div>
    </ScrollArea>
    
    <Dialog.Footer class="px-3">
      <!-- <Button type="submit">Save changes</Button> -->
      <div class="w-full grid grid-cols-[1fr_auto] gap-2 mt-2">
        <!-- <Button onclick={saveCart(data)} class="bg-c0">담기</Button> -->
        {#if $tableId}
          <Button onclick={e=>addToCart({key, data:null, info:data})} class="bg-c0">
            담기
            <ShoppingCart class="!w-3 !h-3 md:!w-4 md:!h-4 stroke-[3]"/>
          </Button>
          
        {/if}
        <Button onclick={e=>onClose(false)}>닫기</Button>
      </div>
    </Dialog.Footer>
  </Dialog.Content>
  {/if}
</Dialog.Root>