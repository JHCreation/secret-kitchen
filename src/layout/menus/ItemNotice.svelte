<script lang="ts">
    import { Dot } from "lucide-svelte";

  let { notice }= $props();
</script>


<div class="flex justify-center mx-auto mt-1">
  {#if notice && notice?.length > 0}
  <ul class=" ">
    {#each notice as item}
      <li class="flex pb-0.5">
        <Dot size={16} class=""/>
        <p class="font-[family-name:var(--font-type2)] text-xs text-center leading-">{item.msg}</p>
      </li>
    {/each}
    
  </ul>
  {/if}
</div>