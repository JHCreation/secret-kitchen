<script lang="ts">
    import { Frown } from "lucide-svelte";
    import Description from "./Description.svelte";
    import Forms from "./Forms.svelte";


  
</script>

<div class="w-full min-h-dvh flex items-center justify-center mb-20">
  <div class="border rounded-sm py-5 px-2 m-2">
    <Description />
    <!-- <div class="flex items-center text-gray-400">
      <Frown size={18}/>
      <span class="text-sm font-bold ml-2">
        입력 양식이 준비중입니다.
      </span>
    </div> -->

    <!-- <p class="text-sm mt-2">문의나 요청이 있으시면 메일이나 카톡으로 알려주세요.</p> -->
    <!-- <p class="text-lg font-bold mt-2 break-keep">리뷰어 신청을 원하시면 간단한 양식으로 이메일을 보내주시면 확인하도록 하겠습니다.</p>
    <ul class="border p-3 inline-block my-5">
      <li class="">이름: </li>
      <li class="">성별: </li>
      <li class="">채널링크: <span class="text-sm text-slate-400">(블로그나 인스타그램 링크주소)</span> </li>
      <li class="">연락처: </li>
    </ul> -->
    


    
    <Forms />
  </div>


</div>