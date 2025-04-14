<script lang="ts">
  import { cartState, cartCurrent } from "~/layout/stores.svelte";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import Cookies from 'js-cookie'
  // import { getMenuInfo } from "./menu";
  import { CirclePlus } from "lucide-svelte";
  import { CircleMinus } from "lucide-svelte";
  import { onMount } from "svelte";
  import { sortCart, saveCart as onSave } from "./cart.svelte";
  import MenuCartQryPrice from "./MenuCartQryPrice.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  console.log(Cookies.get('cart'), $cartState)
  // Cookies.set('cart', 'test', { expires: 10 / 86400 });
  
  let {data, open, onOpen}= $props()

  
  const saveCart= (count)=> {
    console.log($cartCurrent)
    onSave({cartCurrent: $cartCurrent, count})
    onClose()
  }

  onMount(()=>{ console.log('mount', Cookies.get('cart'))} )

  let count: number = $state(1)
  const increment = () => {
    count += 1
  }
  const decrement = () => {
    count =  count - 1 <= 1 ? 1 : count - 1
  }
  const onClose= ()=> {
    count= 1
    onOpen(false)
  }
  // const onClose= ()=> {
  //   count= 1
  //   onOpen(false)
  // }

  let selectOption= $state('')
  /* $effect(()=> {
    if( !open ) {
      publicPriceNum=null
    } 
  })
  $effect(()=> {
    console.log($cartCurrent)
    if( !$cartCurrent?.priceOption && $cartCurrent?.priceNum ){
      publicPriceNum= $cartCurrent?.priceNum
    }
  }) */
  /* $effect(()=> {
    if( selectOption ) {
      const { key, name, imgs, thumb, type, price, salePrice, volume, abv, qty, salePriceNum, priceNum, priceOption }= $cartCurrent
      publicPriceNum= (priceOption && selectOption ) ? Number(priceOption.find(o=> o.key == selectOption).value*1000) : (salePriceNum || priceNum)

      console.log(publicPrice)
    }
  }) */

  // let publicPriceNum= $state(null)
  // let publicPrice= $derived(publicPriceNum.toLocaleString())
  // let totalPrice= $derived(publicPriceNum*$cartCurrent.qty)
  const onValueChange= (val)=> {
    cartCurrent.update((cart)=> {
      const { key, name, imgs, thumb, type, price, salePrice, volume, abv, qty, salePriceNum, priceNum, priceOption }= cart
      console.log(cart, val, priceOption.find(o=> o.key == val).value)

      // publicPriceNum= (priceOption && selectOption ) ? Number(priceOption.find(o=> o.key == selectOption).value*1000) : (salePriceNum || priceNum)
      const num= Number(priceOption.find(o=> o.key == val).value*1000)
      return {
        ...cart,
        priceNum: num,
        price: num.toLocaleString(),
        option: val,
        qty: 1
      }
    })
    return val
  }
</script>


<Drawer.Root open={open} onClose={onClose} >
  <!-- <Drawer.Trigger>Open</Drawer.Trigger> -->
  <Drawer.Content class="w-full max-w-[500px] mx-auto z-[100]">
    {#if $cartCurrent}
      {@const { key, name, imgs, thumb, type, price, salePrice, volume, abv, qty, salePriceNum, priceNum, priceOption, option }= $cartCurrent}
      <Drawer.Header>
        <Drawer.Title>장바구니에 추가 하시겠어요?</Drawer.Title>
        <Drawer.Description>
          
            

              <!-- {@const publicPrice= (priceOption && selectOption )? Number(priceOption.find(o=> o.key == selectOption).value*1000).toLocaleString() : price} -->
              {@const sumPrice= salePrice ? salePriceNum*qty : priceNum*qty}
              
              <div class="flex justify-between items-center mt-2">
                <div class="flex max-w-[180px] md:max-w-[270px]">
                  <div class="w-10 h-10 min-w-10">
                    <img src={`${thumb}`} alt="" class="w-full h-full object-contain">
                  </div>
                  <div class="flex justify-center flex-col">
                    <div class="text-xs md:text-sm font-extrabold leading-4 md:leading-4 line-clamp-2 text-left">{name}</div>
                    <div class="font-['Wanted_Sans_Variable'] flex items-center leading-4">
                      <span class="text-2xs">{volume}</span>
                      {#if volume && abv}
                      <span class="border-l mx-1 border-slate-400 h-2 block"></span>
                      {/if}
                      <span class="text-2xs">{abv}</span>
                    </div>
                  </div>
                </div>
                
                {#if priceOption}
                  <Select.Root 
                    type="single" 
                    bind:value={$cartCurrent.option} 
                    onValueChange={onValueChange}
                  >
                    <Select.Trigger class="w-[70px] h-auto text-2xs rounded-sm py-0.5 px-2 focus:ring-0 focus:ring-offset-0 ml-1" >
                      {option}
                    </Select.Trigger>
                    <Select.Content class="z-[511] w-[78px] min-w-0 -top-1.5">
                      {#each priceOption as option}
                        {@const { key }= option}
                        <Select.Item value={key} class="p-1 pl-6 text-2xs" >{key}</Select.Item>
                      {/each}
                    </Select.Content>
                  </Select.Root>
                {/if}
                

                <div class="flex flex-col">

                  {#if (priceOption && option) || !priceOption}
                    
                    <!-- {console.log(priceOption.find(o=> o.key == selectOption).value)} -->
                    <MenuCartQryPrice 
                      item={$cartCurrent} 
                      qty={qty} 
                      onCountInput={(val)=>console.log(val)}
                      onCount={(count)=> {
                        cartCurrent.update((cart)=>{
                          const sum= cart.qty + count
                          return {
                            ...cart,
                            // qty: (cart.qty || 0) + count,
                            qty: sum <= 1 ? 1 : sum
                          }
                        })
                      }}
                      price={price}
                      {salePrice}
                    />
                  {/if}

                  <!-- {#if !priceOption } -->
                    <!-- <MenuCartQryPrice 
                      item={$cartCurrent} 
                      qty={qty} 
                      onCountInput={(val)=>console.log(val)}
                      onCount={(count)=> {
                        cartCurrent.update((cart)=>{
                          console.log(cart.qty, count)
                          return {
                            ...cart,
                            qty: (cart.qty || 0) + count
                          }
                        })
                      }}
                      option={priceOption}
                      selectOption={selectOption}
                      price={price}
                      {salePrice}
                    /> -->
                  <!-- {/if} -->
                  
                
                    <!-- {#if priceOption}
                      <div class="">
                        {#each priceOption as option}
                          {@const { key }= option}
                          {console.log(option, qty, key)}
                          {@const optQty= qty.find(o=> o.key== key)}

                          <div class="flex items-center">
                            <span class="">{key}</span>
                            <MenuCartQryPrice 
                              item={$cartCurrent} 
                              option={option} 
                              qty={optQty.qty}
                              onCountInput={(val)=>console.log(val)}
                              onCount={(count)=>{
                                cartCurrent.update((cart)=>{
                                  console.log(cart.qty, count)
                                  const res= qty.map(q=> {
                                    if( q.key == key ) return { ...q, qty: q.qty+count}
                                    return q
                                  })
                                  return {
                                    ...cart,
                                    qty: res
                                  }
                                })
                              }} 
                            />
                          </div>
                        {/each}
                      </div>
                    {:else}
                      <MenuCartQryPrice 
                        item={$cartCurrent} 
                        qty={qty} 
                        onCountInput={(val)=>console.log(val)}
                        onCount={(count)=> {
                          cartCurrent.update((cart)=>{
                            console.log(cart.qty, count)
                            return {
                              ...cart,
                              qty: (cart.qty || 0) + count
                            }
                          })
                        }}
                      />

                    {/if} -->
                </div>

                
                
                <!-- <div class="flex-1 flex items-center justify-end mr-3">
                  <button onclick={decrement}>
                    <CircleMinus size={14} />
                  </button>
                  <input bind:value={
                    () => {
                      return count
                    },
                    (val:any)=> { 
                      let result = val.replace(/[^0-9]/g, '');
                      const value= Number(result) ? Number(result) : 0
                      count= value
                      // onSave({cartCurrent: $cartCurrent, count: value-qty})
                      // saveCart({key, id, qty:val}, value-qty)
                      // return ''
                    }
                  } type="text" class="w-7 mx-1 border text-xs py-0.5 px-1 rounded-sm text-center" >
                  <button onclick={increment} class="">
                    <CirclePlus size={14} />
                  </button>
                  
                </div>
                
                <div class="bg-slate-200 px-2 py-0 rounded-sm ml-0 text-center font-['Wanted_Sans_Variable'] row-auto flex items-center flex-col justify-center">
                  {#if salePrice}
                    <div class="border-slate-500 text-slate-400 text-2xs leading-3 line-through">{price}원</div>
                    <div class="border-slate-500 text-slate-600 text-1.5xs md:text-1.5xs leading-3 font-bold">{salePrice}원</div>
                  {:else}
                    <div class="border-slate-500 text-slate-900 text-1.5xs md:text-1.5xs leading-4 font-bold">{price}원</div>
                  {/if}
                </div> -->
                
              </div>
              {#if (priceOption && option) || !priceOption}
              <div class="flex justify-end pt-1 mt-1 border-t text-xs font-extrabold text-red-500">
                {sumPrice.toLocaleString()}원
              </div>
              {/if}
            
        </Drawer.Description>
      </Drawer.Header>
      
      <Drawer.Footer>
        {#if (priceOption && option) || !priceOption}
        <Button onclick={()=> saveCart($cartCurrent.qty)}>추가하기</Button>
        {/if}
        <Drawer.Close>취소</Drawer.Close>
      </Drawer.Footer>

    {/if}
  </Drawer.Content>
</Drawer.Root>