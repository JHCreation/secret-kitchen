<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
    import { Clock8 } from "lucide-svelte";
    import { Instagram } from "lucide-svelte";
    import { CalendarDays } from "lucide-svelte";
    import { SquareArrowOutUpRight } from "lucide-svelte";
    import { MapPin } from "lucide-svelte";
    import { Check } from "lucide-svelte";
    import Logo from "/img/logo/logo.svg"
  const notice= [
    { msg: '물, 냅킨, 물티슈는 셀프로 이용 부탁드립니다.' },
    { msg: '드시다가 남은 모든 주류는 포장 가능합니다.' },
    // { msg: '기본적으로 잔 교체가 되지 않습니다. 양해 부탁드립니다.', detail: ['다음 드실 주류(와인,맥주)나 물로 린싱 추천드립니다'] },
    // { msg: '바틀 테이크아웃시 할인 적용됩니다.', detail: ['와인 -8,000 / 맥주 -1,500 / 위스키 -25,000'] },
    // { msg: '웨이팅시 이용시간을 3시간으로 제한합니다.', detail: '' },
    { 
      msg: '콜키지 서비스 안내', 
      detail: ['매장내 와인 1병이상 구매시 가능합니다.', '최대 와인 1병만 가능합니다.', '비용은 1병당 20,000원 입니다.'], 
      type: 'accordion' 
    },
    { msg: '대기 손님이 있을때, 2시간으로 이용시간 제한이 있습니다.' },
  ]
</script>
{#snippet name(name)}
  <div class="min-w-16 text-md font-[family-name:var(--font-type4)] font-bold">
    {name}
  </div>
{/snippet}

{#snippet discript(name)}
  <div class="text-ss font-medium mr-2 font-[family-name:var(--font-type2)]">
    {name}
  </div>
{/snippet}

{#snippet wrap(name)}
  {@render discript(name)}
{/snippet}



<div class="w-full max-w-28 md:max-w-40 mx-auto">
  <img src={Logo} alt="">
</div>
<div class="border md:border-none rounded-lg font-[family-name:var(--font-type2)] w-full max-w-container-sm mx-auto flex flex-col md:flex-row mt-6">
  
  <div class="md:border rounded-lg flex-1 p-5 inline-block md:mr-8">
    <!-- <p class="text-lg font-bold">시크릿키친</p> -->

    <div class="mt-1">
      <ul class="list-disc ">
        <li class="flex flex-col pb-3">
          {@render name('주소')}
          {@render discript('서울시 광진구 아차산로 31길 20 지하')}
        </li>
        <li class="flex flex-col pb-3">
          {@render name('영업시간')}
          <div class="font-bold">
            {@render wrap('화-목: 17:00 - 01:00, 일: 18:00 - 23:00')}
            {@render wrap('금-토: 17:00 - 02:00 ( 다음날 휴일인 날도 동일 )')}
          </div>
        </li>
        <!-- <li class="flex flex-col py-1">
          {@render name('영업시간')}
          <div class="font-bold">
            {@render wrap('화-목: 18:00 - 24:00, 일: 18:00 - 23:00')}
            {@render wrap('금-토: 18:00 - 01:00 ( 다음날 휴일인 날도 동일 )')}
          </div>
        </li> -->
      </ul>

      <!-- <div class="flex items-start py-0.5">

        <div class="leading-3">
          
          {@render discript('서울시 광진구 아차산로 31길 20 지하')}
          
          <div class="text-c0 flex gap-2 leading-5">
            <a href="https://naver.me/xSFa3YoP" target="_blank" class="flex items-center text-xs underline underline-offset-2">
              네이버 플레이스
            </a>
            <a href="https://place.map.kakao.com/974114408" target="_blank" class="block text-xs underline underline-offset-2">
              카카오맵
            </a>
          </div>
        </div>
      </div>

      <div class="flex items-start py-0.5">
        <div class="flex items-center">
          <Clock8 size={11} class="font-black text-orange-500 mr-1"/>
          <span class="text-xs font-semibold mr-2 text-slate-500 w-12">영업시간</span>
        </div>
        
        <div class="">
          <p class="text-xs font-semibold"> 화-목: 18:00 - 24:00, 일: 18:00 - 23:00 </p>
          <p class="text-xs font-semibold"> 금-토: 18:00 - 01:00 ( 다음날 휴일인 날도 동일 ) </p>
          <p class="text-xs font-semibold ">월: <span class="text-red-500">휴무</span> </p>
        </div>
      </div>

      <div class="flex items-center py-0.5">
        <CalendarDays size={12} class="font-black text-orange-500 mr-1"/>
        <span class="text-xs font-semibold mr-2 text-slate-500 w-12">예약</span>
        <div class="text-c0 flex gap-2">
          <a href="https://booking.naver.com/booking/6/bizes/781601/items/4669541" target="_blank" class="text-xs underline underline-offset-2">네이버</a>
          <a href="https://app.catchtable.co.kr/ct/shop/corenzohouse" target="_blank" class="text-xs underline underline-offset-2">캐치테이블</a>
        </div>

      </div>
      
      <div class="flex items-center py-0.5">

        <Instagram size={12} class="mr-1 text-orange-500"/>
        <span class="text-xs font-semibold mr-2 text-slate-500 w-12">SNS</span>
        <a href="https://www.instagram.com/corenzo_house/" target="_blank" class="text-xs underline underline-offset-2 text-c0">인스타그램</a>
      </div> -->
    </div>
  </div>

  <div class="md:border rounded-lg flex-1 py-5 px-5">
    <!-- <p class="font-bold">안내사항 (꼭 확인해 주세요!)</p> -->
    {@render name('안내사항')}
    <ul class="py-1 list-[upper-roman]">
      {#each notice as notice, i}
        <li class="py-0.5 flex">
          
          <!-- <Check size={14} class="text-red-500 mt-0. mr-1"/> -->
          <div class="leading-3 py-1">
            {#if notice?.type == 'accordion'}
              <Accordion.Root type="single" class="">
                <Accordion.Item value="item-1" class="border-0" >
                  <Accordion.Trigger class="inline-flex justify-start py-0 hover:no-underline">{@render wrap(notice.msg)}</Accordion.Trigger>
                  <Accordion.Content class="">
                    {#if notice?.detail }
                      <ul class="list-disc list-inside py-1.5">
                        {#each notice?.detail as detail}
                          <li class="text-1.5xs my-1 text-slate-500">{detail}</li>
                        {/each}
                      </ul>
                    {/if}
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            {:else}
              {@render wrap(notice.msg)}
              <!-- <span class="text-xs ">{notice.msg}</span> -->
              {#if notice?.detail }
                <ul class="list-disc list-inside">
                  {#each notice?.detail as detail}
                    <li class="text-1.5xs mt-2 text-slate-500">{detail}</li>
                  {/each}
                </ul>
              {/if}
            {/if}
            
            <!-- {#if i == 2 }
            <Accordion.Root type="single" class="">
              <Accordion.Item value="item-1" class="border-0" >
                <Accordion.Trigger class="inline-flex py-0 text-1.5xs text-slate-400 justify-start">- 린싱하는 방법 영상보기</Accordion.Trigger>
                <Accordion.Content>
                  <div class="mt-2 flex justify-center w-full">
                    <iframe title="와인 린싱하는 법" width="176.4" height="315" src="https://www.youtube.com/embed/47Yk5Wyu1vM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            {/if} -->
          </div>
          
        </li>
        
      {/each}
    </ul>
    
    


    <!-- <Accordion.Root type="single" class="">
      <Accordion.Item value="item-1" class="border-0">
        <Accordion.Trigger class="text-xs text-slate-400">* 외부음식 이용시 안내사항</Accordion.Trigger>
        <Accordion.Content>
          
          <ul class="text-1.5xs leading-4 font-['Wanted_Sans_Variable']">
            <li class="">
              - 와인/위스키와 푸드 페어링을 위해 준비된 서비스입니다. <span class="text-red-500 font-black"><br>(반드시 취지를 좀 지켜주세요.)</span>
            </li>
            <li class="">
              - 외부음식 반입시 테이블 차지 1,000원이 발생합니다.
            </li>
            <li class="">
              - 음식 외에 <span class="font-black">주류 및 음료 </span>는 <span class="font-black">불가</span>합니다.
            </li>
            <li class="">
              - <span class="underline font-black text-c0">케이크, 간단한 스낵</span> 종류는 <span class="underline font-black">주류 가격만</span>으로 <span class="underline font-black text-c0">최소 주류금액은 30,000원 이상</span> 이어야 합니다.
            </li>
            <li class="">
              - <span class="underline font-black text-c0">그 외 외부음식</span>은 <span class="underline font-black">주류 가격만</span>으로 <span class="underline font-black text-c0">최소 주류금액은 20,000원/1인당 이상</span> 이어야 합니다.
            </li>
            <li class="">
              - 예시) 4인이 이용할 경우 : 4인 x 20,000원 = 80,000원(주류 가격만 해당)
            </li>
            <li class="">
              - 반드시 <span class="underline font-black text-c0">와인 혹은 위스키</span>로 주류 금액을 채우셔야 합니다. (추가는 맥주도 가능)
            </li>
            <li class="">
              - <span class="underline font-black">기준금액 미달시 차액은 서비스차지로 결제</span>됩니다
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root> -->
  </div>


  

</div>