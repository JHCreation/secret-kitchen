
<script lang="ts">
    import { Utensils } from "lucide-svelte";
    import { MapPin } from "lucide-svelte";
    import { CircleCheckBig } from "lucide-svelte";
    import { SquareArrowOutUpRight } from "lucide-svelte";
    import { PencilLine } from "lucide-svelte";
    import { FileText } from "lucide-svelte";
    import { Quote } from "lucide-svelte";
    import { Button } from "~/lib/components/ui/button";

    import ReviewersVector from '~/assets/vectors/reviewers.svg';
    import ReviewersLogoVector from '~/assets/vectors/review-logo.svg';


  const listContents= [
    {
      icon: FileText,
      title: '자격조건',
      subject: '네이버블로그, 인스타그램 활동을 하시면서 와인외 맥주, 위스키에 관심이 있는 누구나 참여 가능합니다.'
    },
    {
      icon: Utensils,
      title: '제공내역',
      subject: '해당기간의 주제와 리뷰어들에게 맞는 주류&푸드와 기타서비스를 제공해 드립니다.'
    },
    {
      icon: PencilLine,
      title: '신청방법',
      subject: '웹사이트 양식을 작성해서 신청해 주시면 해당기간의 주제와 인원을 기준으로 선정해 일정을 협의 합니다.'
    },
    {
      icon: MapPin,
      title: '매장위치',
      subject: `광진구 아차산로31길 20 지하<br>[시크릿키친] Secret Kitchen`
    }
  ]
</script>


<div class="w-full max-w-[600px]">
  <!-- <img src={`/img/vectors/wine-glass.svg`} alt="" class="relative z-10 w-full max-w-64 mx-auto"> -->
  
  <div class="relative">
    <img src={ReviewersVector} alt="" class="relative z-10 w-full mx-auto">
    <div class="z-20 absolute h-28 w-full bottom-0 bg-gradient-to-t from-5%- from-[#F4F2E9] to-transparent"></div>
  </div>
  <div class="relative bg-[#F4F2E9]">
    <div class="w-full relative top-[-60px]- md:px-8 px-4 py-10">
      <img src={ReviewersLogoVector} alt="" class="max-w-40 mx-auto mt-8">
      <div class="text-amber-950 mt-8">
        <Quote size={16} class="mx-auto rotate-180"/>
        <p class="text-center text-xl font-bold max-w-52 break-keep mx-auto my-2">와인의 종류는 밤하늘의 별만큼이나 많다.</p>
        <Quote size={16} class="mx-auto "/>
      </div>
  
      <div class="leading-5 text-sm mt-6 text-amber-950 text-center break-keep">
        컨벤셔널/내추럴 와인을 주력으로, 국내외 크래프트 비어, 위스키, 다양하고 맛있는 주류를 감동의 푸드와 함께 즐기실 수 있는 공간 <span  class="font-black text-lg text-red-700 font-[family-name:var(--font-type0)]">시크릿키친</span> 입니다. <br><br>
        맛있는 술을 즐기기엔 인생은 너무나 짧습니다. 많은분들이 다양하고 맛있는 음주문화를 합리적인 가격에 즐길수 있도록 노력하기 위해 다양한 의견을 수집하고 여러분의 의견을 듣고자 정기적인 리뷰어들을 모집합니다.
      </div>
  
      <ul class="my-8">
        {#each listContents as item}
          {@const Icon= item.icon}
          <li class="py-4">
            <div class="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
              <Icon class="text-white" />
            </div>
            <p class="text-red-700 font-extrabold mt-1">{@html item.title}</p>
            <p class="text-amber-950 text-sm mt-1">{@html item.subject}</p>
          </li>
        {/each}
      </ul>
  
  
      <div class=" ">
        <CircleCheckBig size={18} class="text-orange-600 inline-block"/>
        <span class="text-amber-950 ml-0.5 underline underline-offset-2">
          선정을 통해 진행중 혹은 진행예정인 서비스와 주류&푸드와 기타서비스를 제공해 드리며, 체험을 통해 리뷰들을 작성해 주시면 됩니다.
        </span>
      </div>
  
      <a href="/menus" target="_blank" class="block mt-4">
        <Button class="bg-orange-600 hover:bg-orange-600 w-full text-amber-950 font-bold">메뉴보기</Button>
      </a>


      <ul class="list-disc- list-inside mt-3">
        <li class="flex items-center">
          <a href="https://www.instagram.com/secretkitchen_bistro_" target="_blank" class="underline leading- hover:text-orange-600 text-amber-950">@secretkitchen_bistro_</a>
          <SquareArrowOutUpRight strokeWidth={2.5} size={15} class="text-amber-950 ml-1 mt-1"/>
        </li>
        <li class="flex items-center">
          <a href="mailto:chef_ljs@naver.com" class="underline leading- hover:text-orange-600 text-amber-950">chef_ljs@naver.com</a>
          <SquareArrowOutUpRight strokeWidth={2.5} size={15} class="text-amber-950 ml-1 mt-1"/>
        </li>
        <li class="flex items-center">
          <a href="https://naver.me/xSFa3YoP" target="_blank" class="underline leading- hover:text-orange-600 text-amber-950">네이버</a>
          <SquareArrowOutUpRight strokeWidth={2.5} size={15} class="text-amber-950 ml-1 mt-1"/>
        </li>
      </ul>
  
    </div>
  </div>
</div>