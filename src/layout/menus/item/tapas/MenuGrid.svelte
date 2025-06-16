<script lang="ts">
  import Loading from "~/components/ui/Loading.svelte";
  import { menuState } from "../../../stores.svelte";
  import Item from "./Item.svelte";
  import _ from "lodash";
  import clsx from 'clsx';
    import { CircleAlert } from "lucide-svelte";
  
  let { id, list }= $props()
  let sortList= $derived(_.groupBy(list, 'type1'))
  let grid= $state(4)
  const category ={
    main: '메인',
    pasta: '파스타',
    side: '사이드',
    salad: '샐러드'
  }
  $inspect($menuState, list, sortList)
</script>


{#if $menuState && sortList}
    {#each Object.keys(sortList) as key(key)}
      <div class="py-10">

          <div class="font-[family-name:var(--font-type4)] md:text-center text-2xl md:text-3xl border-b-2 border-c1 mb-2 md:mb-4 pb-2 md:pb-4 md:mx-4 px-4 ">{category[key]}</div>
          {#if sortList[key].length > 0}
            <div class={`grid justify-center 
              md:grid-cols-[repeat(auto-fill,115px)]
              ${clsx({ 
                'grid-cols-4': grid==4, 
                'grid-cols-3': grid==3, 
              }) } gap-1 md:gap-2`}
            >
              {#each sortList[key] as data}
                <Item key={id} data={data} />
              {/each}
            </div>
          {/if}

          {#if sortList[key].length == 0}
          <div class="min-h-[200px] flex items-center justify-center">
            <div class="border rounded-md px-5 py-2 flex items-center">
              <CircleAlert size={16} class="text-red-500"/>
              <span class="ml-2 text-sm">해당 제품이 없습니다.</span>
            </div>
          </div>
          
          {/if}
      </div>  

    {/each}

{:else}
  <div class="w-full min-h-96 flex items-center justify-center">
    <div class="w-24">
      <Loading />
    </div>
  </div>
{/if}