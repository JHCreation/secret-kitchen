<script module>
  // export const fixSafariNavBug = (el)=> {
  //   if( !el ) return
  //   el.style.display = 'none';
  //   void el.offsetHeight;
  //   el.style.display = '';
  // }
</script>
<script lang="ts">
  import { Link } from "svelte-routing";
  import routes from "../../routes";
  import Logo from "/img/logo/logo.svg"
  import MenuCart from "../menus/cart/MenuCart.svelte";

  import { menuState, cartOpen, cartCurrent, addToCart, cartStateOpen, cartState, tableId, bottomNavEl } from "../stores.svelte";
  import { detailOpen, detailData, handlerDetailOpen, setDetailData } from "../menus/menu_store.svelte";
  
  import { Beer, ShoppingCart, Wine } from 'lucide-svelte';
  import Glen from "../icons/Glen.svelte";
  import { menuType } from "../menus/menu";
  import MenuCartState from "../menus/cart/MenuCartState.svelte";
  import { AlignJustify } from "lucide-svelte";
  import MenuDetail from "../menus/MenuDetail.svelte";
  import _ from "lodash";
  import { onMount } from "svelte";

  let open = $state(false)
  let iconSize="w-5 h-5 md:w-6 md:h-6 "
  let nav;

  // export function fixSafariNav() {
  //   nav.style.display = 'none';
  //   void nav.offsetHeight;
  //   nav.style.display = '';
  // }

  // onMount(() => {
  //   bottomNavEl.set(nav)
  //   window.addEventListener('resize', fixSafariNavBug);
  //   // document.body.appendChild(nav);
  // });
</script>


<!-- <div class="border-b py-4 px-3">
  <div class="max-w-container max-w-screen mx-auto flex justify-between ">
  
    <div class="w-14"><img src={Logo} alt="" class=""></div>
    <ul class="flex items-center justify-end">
      {#each routes as link}
        {@const view= link?.view != false}
        {#if view}
          <li class="">
            <Link to={link.path}>{link.name}</Link>
          </li>
        {/if}
        
      {/each}
    </ul>
  </div>
</div> -->

<div 
  bind:this={nav}
  class="fixed bottom-0 left-0 w-full z-30 bg-c1 pt-2 pb-6 md:py-1"
  style="transform: translateZ(0); will-change: transform;"
>
  <div class="w-full max-w-[600px] mx-auto grid grid-flow-col">
    <div class="flex items-center justify-center">
      <Link to={'/menus'} class="py-2.5 px-3">
        <div class={`${iconSize} relative`}>
          <AlignJustify class="w-full h-full text-slate-100"/>
        </div>
      </Link>
    </div>
    {#each Object.keys(menuType) as key}
      {#if $menuState && $menuState[key].length > 0 }
        {@const Icon= menuType[key].icon}
        <div class="flex items-center justify-center">
          <Link to={`/menus${menuType[key].link}`} class="py-2.5 px-3" preserveScroll>
            <div class={`${iconSize}`}>
              <Icon class="w-full h-full text-slate-100"/>
            </div>
          </Link>
        </div>
      {/if}
    {/each}

    {#if $tableId}
      <button onclick={()=>cartStateOpen.set(true)} class="flex items-center justify-center px-3">
        <div class={`${iconSize} relative `}>
          {#if $cartState && $cartState?.length > 0 }
            {@const total= _.sumBy($cartState, 'qty')}
            <div class="absolute top-[-7px] right-[-9px] w-4 h-4 bg-red-500 flex items-center justify-center rounded-full ">
              <span class="font-black text-white text-3xs mt-[1px]">{total}</span>
            </div>
          {/if}
          
          <ShoppingCart class="w-full h-full text-green-300"/>
        </div>
      </button>
    {/if}
    
    <!-- <button class="flex items-center justify-center">
      <div class="w-6 h-6">
        <Wine />
      </div>
    </button>
    <button class="flex items-center justify-center">
      <div class="w-6 h-6">
        <Glen />
      </div>
    </button>
    <button class="flex items-center justify-center">
      <div class="w-6 h-6">
        <Beer />
      </div>
    </button>
    <button class="flex items-center justify-center">
      <div class="w-6 h-6">
        <Beer />
      </div>
    </button> -->
  </div>
  
</div>

<MenuDetail data={$detailData} open={$detailOpen} onOpen={handlerDetailOpen} setDetailData={setDetailData}/>
  <MenuCart data={$cartCurrent} open={$cartOpen} onOpen={()=>cartOpen.set(open)}/>
<MenuCartState />
