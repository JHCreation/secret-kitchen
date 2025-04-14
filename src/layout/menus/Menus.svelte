<script lang="ts">
  import { menuState } from "../stores.svelte";
  import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
  import { Badge } from "$lib/components/ui/badge";
  
  // Default theme
  // import '@splidejs/svelte-splide/css';

  // or other themes
  // import '@splidejs/svelte-splide/css/skyblue';
  // import '@splidejs/svelte-splide/css/sea-green';

  // or only core styles
  import '@splidejs/svelte-splide/css/core';
  import { menuType } from "./menu";
  import { MoveLeft, MoveRight } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button/index.js";
  import Loading from "~/components/ui/Loading.svelte";
  import { Link } from "svelte-routing";
  import { ChevronRight } from "lucide-svelte";
  import Item from "./item/Item.svelte";
  import Notice from "./Notice.svelte";
  import MenuWrap from "./MenuWrap.svelte";
    import PopupNotice from "./PopupNotice.svelte";
  
  console.log(menuType, Object.keys(menuType))
</script>

<!-- <PopupNotice /> -->

<MenuWrap>
<div class="px-1">
  <Notice />
  
  <div class="mt-4">
    {#if $menuState}
      {#each Object.keys(menuType) as key}
        <div class="py-10">
          <div class="flex items-end ">
            <div class="leading-5 font-[family-name:var(--font-type-en)] text-4xl md:text-6xl">{menuType[key].name}</div>
            <Link to={`/menus/${key}`} class="flex items-center ml-1">
              <span class="ml-2 font-[family-name:var(--font-type4)] text-xs md:text-md underline underline-offset-4">전체보기</span>
              <ChevronRight size={16} class=""/>
            </Link>
          </div>
          
          <Splide aria-label={key}
            class="w-full mt-4"
            hasTrack={false}
            options={{
              // width : 800,
              drag: 'free',
              snap: true,
              speed: 400,
              perPage: 28,
              gap: 5,
              padding: { left: 0, right: 50 },
              breakpoints: {
                3400: { perPage: 16, perMove: 5, },
                2400: { perPage: 12, perMove: 5, },
                2000: { perPage: 12, perMove: 5, },
                1500: { perPage: 8, perMove: 5, },
                960: { perPage: 5, perMove: 5, },
                780: { perPage: 4, perMove: 4,},
                640 : { perPage: 4, perMove: 1,},
                480 : { perPage: 4, perMove: 1, padding: {right:20},},
              },
              flickPower: 600,
              flickMaxPages: 1,
              dragMinThreshold: {
                mouse: 0,
                touch: 10,
              },
            }}
          >
            
            <div class="splide__arrows w-full flex justify-between items-center">
              <Button size={'sm'} class="splide__arrow splide__arrow--prev bg-transparent border-slate-600 border text-slate-600 hover:text-slate-200 p-1.5 md:p-2.5 h-auto touch-manipulation">
                <MoveLeft />
              </Button>
              <Button size={'sm'} class="splide__arrow splide__arrow--next bg-transparent border-slate-600 border text-slate-600 hover:text-slate-200 p-1.5 md:p-2.5 h-auto touch-manipulation">
                <MoveRight />
              </Button>
            </div>

            <SplideTrack class="mt-2">
              {#each $menuState[key] as data}
                <!-- {@const info= getMenuInfo(key, data)} -->
                <!-- {@const { name, imgs, url, type, price, salePrice, volume, abv, }= info} -->
                <SplideSlide class="flex ">
                  <Item key={key} data={data}/>
                  
                </SplideSlide>
              {/each}
            </SplideTrack>
          </Splide>
        </div>
        
      {/each}
    {:else}
      <div class="w-full min-h-96 flex items-center justify-center">
        <div class="w-24">
          <Loading />
        </div>
      </div>
    {/if}
  </div>


</div>
</MenuWrap>