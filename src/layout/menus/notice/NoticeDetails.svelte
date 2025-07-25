<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>


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