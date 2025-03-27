<script lang="ts">
  import Loading from "~/components/ui/Loading.svelte";
  import { menuState } from "../../stores.svelte";
  import Item from "./Item.svelte";
  import _ from "lodash";
  import clsx from 'clsx';
    import { CircleAlert } from "lucide-svelte";
  
  let { id, list }= $props()
  let grid= $state(4)
</script>


{#if $menuState}

  {#if list.length > 0}
    <div class={`grid justify-center 
      md:grid-cols-[repeat(auto-fill,115px)]
      ${clsx({ 
        'grid-cols-4': grid==4, 
        'grid-cols-3': grid==3, 
      }) } gap-1 md:gap-2`}
    >
      {#each list as data}
        <Item key={id} data={data} />
      {/each}
    </div>
  {/if}

  {#if list.length == 0}
  <div class="min-h-[200px] flex items-center justify-center">
    <div class="border rounded-md px-5 py-2 flex items-center">
      <CircleAlert size={16} class="text-red-500"/>
      <span class="ml-2 text-sm">해당 제품이 없습니다.</span>
    </div>
  </div>
  
  {/if}

{:else}
  <div class="w-full min-h-96 flex items-center justify-center">
    <div class="w-24">
      <Loading />
    </div>
  </div>
{/if}