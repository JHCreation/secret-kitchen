<script lang="ts">
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { menuInit, cartState, cartStateOpen, cartCurrent, cartStateList, tableId, orders, orderId, getOrderId, noPush } from "~/layout/stores.svelte";
  import { menuType } from "../menu";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import _ from "lodash";
  import { CircleMinus } from "lucide-svelte";
  import { CirclePlus } from "lucide-svelte";
  import { removeCart, saveCart } from "./cart.svelte";
  import { CircleX } from "lucide-svelte";
  import MenuCartQryPrice from "./MenuCartQryPrice.svelte";
  import { getByteSize, getRandomNumber } from "~/components/utils/util";
  import { pushSubscriptions } from "~/layout/pushStore.svelte";
  import { type CreateOrdeGroupParam, createOrderGroup, createOrders, makeOrderList, type OrderStatusType, pushBulkRun } from "./pushCart.svelte";
  import { generateShortId } from "~/utils/uid";
  import Loading from "~/components/ui/Loading.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import dayjs from 'dayjs'
  import queryString from "query-string";
  import { getSaleDate } from "~/layout/stores-utils.svelte";
  

  // import { orders } from "~/layout/stores.svelte";
  
  let sendOrder= $state(false)
  let loading= $state(false)
  const onClose= (open)=> {
    cartStateOpen.set(open)
    sendOrder=false
  }

  $inspect('리스트', $cartStateList)

  const onSave= (cartCurrent, count)=> {
    saveCart({cartCurrent, count})
    // onClose()
  }

  

  const orderSubmit= async ()=> {
    // return
    if( !$cartStateList || $cartStateList?.length == 0 ) return alert('주문할 상품을 담아주세요.')
    if( !$tableId ) return alert('QR 코드를 다시 스캔해 주세요.')
    loading= true

    let order_id;
    let orderGroupParam:CreateOrdeGroupParam

    const currentDate= getSaleDate()
    const saleDate= currentDate.format('YYYY-MM-DD')
    let currentOg= null
    // if ( !$orders ) {
			const qry= queryString.stringify({ tid: $tableId, status: 'use', sale_date: saleDate })
      currentOg= await getOrderId(qry)
      // return
      if( currentOg ) {
        order_id= currentOg.id
      }
      
      if( !currentOg ) {
        // console.log(order_id, $orderId)
        order_id= `${currentDate.format('YYYYMMDD')}_${generateShortId(16)}`
        orderGroupParam = {
          order_id,
          store_id: 'kuk',
          table_id: $tableId,
          sale_date: saleDate,
          status: 'use'
        }
      }

    // }
    // if ( $orders && !currentOg ) {
    //   order_id= $orders?.id
    // }

    const orderInfo= makeOrderList({ cartStateList: $cartStateList, tid: $tableId })
    type SubmitParamType = {
      orders: any
      group?: any
      push: Boolean
      tid: string
      title: string
    }
    const submitParam:SubmitParamType= {
      orders: {
        key: generateShortId(16), 
        content: JSON.stringify(orderInfo), 
        order_id: order_id,
      },
      push: !$noPush,
      tid: $tableId,
      title: '주문요청'
    }
    if( orderGroupParam ) submitParam.group= orderGroupParam
    console.log(submitParam, !$noPush, $noPush)
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/orders-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitParam)
    })
    const result= await res.json()
    console.log(result)
    if( result ) {
      sendOrder= true
      loading = false
      const qry= queryString.stringify({ tid: $tableId, status: 'use' })
      getOrderId(qry)
      cartState.set([])
    }


    // console.log(orderInfo)
    /* if( $noPush ) return
    const pushRes= pushBulkRun({ orders: {...orderInfo, tid: $tableId } })
    const orderRes= createOrders({ 
      params: { 
        key: generateShortId(16), 
        content: JSON.stringify(orderInfo), 
        order_id: order_id,
      } 
    }) */
    return



    /* Promise.all([pushRes, orderRes])
    .then(res=> {
      console.log(res)
      const result= res.some(r=> {
        console.log(r)
        return r != 'success'
      })
      if( !result ) {
        sendOrder= true
        loading = false
        const qry= queryString.stringify({ tid: $tableId, status: 'use' })
        getOrderId(qry)
        cartState.set([])
      }
      console.log(result)
    }) */
    return;
  }


  let msg= $state('')

</script>


<Dialog.Root open={$cartStateOpen} onOpenChange={onClose}>
  
  <Dialog.Content class="w-full max-w-[425px] block px-2">
    
    <Dialog.Header >
      <Dialog.Title class="text-center">장바구니</Dialog.Title>
      <Dialog.Description class="text-center">
        <!-- 주문은 직원을 불러주세요. -->
        {#if ( $cartStateList && $cartStateList?.length > 0 ) }
          주문버튼을 클릭하면 주문이 완료됩니다.
        {/if}
      </Dialog.Description>
    </Dialog.Header>
    
    {#if loading}
      <div class="w-full min-h-[40dvh] flex items-center justify-center">
        <div class="w-16">
          <Loading />
        </div>
      </div>
    {/if}

    
    {#if !loading}
      
      {#if $cartStateList && $cartStateList?.length > 0}
        {@const totalPrice= _.sumBy($cartStateList, (item:any)=> {
          // const currentPriceNum= item.optionPriceNum ? item.optionPriceNum : ( item.salePriceNum ? item.salePriceNum : item.priceNum)
          const currentPriceNum= item.payPriceNum
          return currentPriceNum * item.qty
          // return item.salePriceNum ? item.salePriceNum*item.qty : item.priceNum*item.qty
        })}
        <ScrollArea class="my-4">
        
          <div class="w-full relative max-h-[calc(100dvh-250px)] ">
            {#each $cartStateList as item}
              
              {@const { key, id, name, imgs, thumb, type, price, salePrice, volume, abv, qty, priceNum, salePriceNum, priceOption, option, optionPrice, optionPriceNum }= item}
              {@const currentPrice= optionPrice ? optionPrice : ( salePrice ? salePrice : price)}
              <!-- {@const currentPriceNum= optionPriceNum ? optionPriceNum : ( salePriceNum ? salePriceNum : priceNum)} -->
              {@const currentPriceNum= item.payPriceNum}
              {@const itemTotal= Number(currentPriceNum) * Number(qty)}

              
              <div class="flex justify-between items-center pt-1">
                <div class="flex max-w-[180px] md:max-w-[270px]">
                  <div class="w-10 h-10 min-w-10">
                    <img src={`${thumb}`} alt="" class="w-full h-full object-contain">
                  </div>
                  <div class="ml-1.5 flex justify-center flex-col">
                    <div class="text-xs md:text-sm font-bold leading-3 md:leading-[1em] line-clamp-2 text-left">{name}</div>
                    
                    {#if volume || abv }
                      <div class="font-['Wanted_Sans_Variable'] flex items-center leading-4">

                        {#if volume}
                          <span class="text-2xs">{volume}</span>
                        {/if}
                        {#if volume && abv}
                          <span class="border-l mx-1 border-slate-400 h-2 block"></span>
                        {/if}
                        {#if abv}
                          <span class="text-2xs">{abv}</span>
                        {/if}
                      </div>
                    {/if}

                  </div>
                </div>

                

                <div class="flex justify-end items-center ">

                  {#if (priceOption && option) || !priceOption}
                    {#if (priceOption && option)}
                      <div class="border text-2xs rounded-sm px-1.5 py-0.5">{option}</div>
                    {/if}
                    <!-- {console.log(priceOption.find(o=> o.key == selectOption).value)} -->
                    <MenuCartQryPrice 
                      item={item} 
                      qty={qty} 
                      onCountInput={(val)=>console.log(val)}
                      onCount={(count)=> {
                        onSave(item, count)
                      }}
                      price={price}
                      salePrice={currentPrice}
                    />
                  {/if}

                  <div class="ml-1 mr-2">
                    <button onclick={()=>removeCart({item:{key, id, option}})}>
                      <CircleX size={18} class="text-red-500 font-black"/>
                    </button>
                  </div>
                </div>
              </div>
              <div class="border-b text-xs flex justify-end py-1.5 text-slate-600">
                <span class="font-['Wanted_Sans_Variable'] font-semibold">{itemTotal.toLocaleString()}원</span>

              </div>
            {/each}
          </div>

          
        
        </ScrollArea>

        <div class="border-t- py-2 px-2 flex items-center justify-between">

          <span class="text-sm">총금액</span>
          <span class="text-sm font-black font-['Wanted_Sans_Variable']">{totalPrice.toLocaleString()}원</span>
          
        </div>
      {:else}
        {#if sendOrder}
          <div class="border- text-center py-8 px-3 font-bold text-c0">
            주문이 완료되었습니다!
          </div>
        {:else}
          {#if ( !$cartStateList || $cartStateList?.length == 0 ) }
            <div class="border- text-center py-8 px-3">
              <span class="text-red-400 text-sm">주문할 상품을 담아주세요.</span>
            </div>
            
          {/if}
        {/if}
        
      {/if}
      <Dialog.Footer>
        <div class="w-full">
          <!-- {#if ( $cartStateList && $cartStateList?.length > 0 ) }
            <div class="flex items-center">
              <span class="text-xs text-nowrap">메세지:</span>
              <Input bind:value={msg} class="ml-2"/>
            </div>
          {/if} -->
          <div class="w-full grid grid-cols-[1fr_auto] gap-2 mt-2">
            {#if ( $cartStateList && $cartStateList?.length > 0 ) }
              <Button onclick={orderSubmit} class="bg-c0 hover:bg-c0">주문하기</Button>
              <!-- <Button class="bg-c0 hover:bg-c0">주문은 직원을 불러주세요</Button> -->
            {/if}
            <Button onclick={e=>onClose(false)}>닫기</Button>
          </div>
        </div>
      </Dialog.Footer>

    {/if}
    
  </Dialog.Content>
</Dialog.Root>