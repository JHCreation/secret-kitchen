<script lang="ts">
  import { CircleX } from "lucide-svelte";
  import { CirclePlus } from "lucide-svelte";
  import { CircleMinus } from "lucide-svelte";

  let { item, qty, onCount, onCountInput, price, salePrice, }= $props();
  // const { key, id, name, imgs, thumb, type,  volume, abv, priceNum, salePriceNum }= item
  // console.log(qty)
</script>


<div class="flex justify-end items-center ">
  <div class="text-xs font-black">
    <div class="flex-1 flex items-center justify-end mx-1.5">
      <button onclick={()=>{
        onCount(-1)
        // if(qty-1 < 1) return
        // saveCart({cartCurrent: {key, id, qty}, count:-1})
      }}>
        <CircleMinus size={14} />
      </button>
      <input bind:value={
        () => {
          // console.log('qty', item)
          return qty
        },
        onCountInput
        /* (val)=> { 
          let result = val.replace(/[^0-9]/g, '');
          const value= Number(result) ? Number(result) : 0
          saveCart({ cartCurrent: {key, id, qty:val}, count: value-qty})
          // return ''
        } */
      } type="text" disabled class="w-7 mx-1 bg-slate-200 border text-xs py-0.5 px-1 rounded-sm text-center" >
      <button onclick={()=>{
        onCount(1)
        // saveCart({cartCurrent: {key, id, qty}, count: 1})
      }} class="">
        <CirclePlus size={14} />
      </button>
    </div>
  </div>
  

  <div class="min-w-[70px] bg-slate-200 w-full py-1 px-1.5 rounded-sm ml-0 text-center font-['Wanted_Sans_Variable'] row-auto flex items-center flex-col justify-center mr-1">
    {#if salePrice}
      <div class="text-slate-400 text-3xs leading-3 line-through">{price}원</div>
      <div class="text-slate-600 text-2xs md:text-2xs leading-3 font-medium">{salePrice}원</div>
    {:else}
      <div class="text-slate-900 text-2xs md:text-2xs leading-4 font-medium">{price}원</div>
    {/if}
  </div>
  
  <!-- <div class="ml-2 mr-2">
    <button onclick={()=>removeCart({item:{key, id}})}>
      <CircleX size={18} class="text-red-500 font-black"/>
    </button>
  </div> -->
</div>