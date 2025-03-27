<script lang="ts">
  import { ChevronDown } from "lucide-svelte";
  import { ChevronUp } from "lucide-svelte";
    import { twMerge } from "tailwind-merge";
  import Button from "~/lib/components/ui/button/button.svelte";

  let { id, key, sort, setSort, label, className= '' }= $props()
  let currentSort= $derived<any>(sort.find(s=> s.key == `${key}`))
  $inspect(sort, currentSort)
  const handleClick= ()=> {
    let order;
    switch (currentSort?.type) {
      /* case undefined:
        order='asc'
        break; */
      case 'asc':
        order='desc'
        break;
      case 'desc':
        order=''
        break;
      default:
        order= 'asc'
        break;
    }
    console.log(order)
    if(currentSort?.type == '' ) {
      setSort({
        key: `${key}`,
        type: null
      })
    } else {
      setSort({
        key: `${key}`,
        type: order
      })
    }

    
  }
</script>
<!-- {console.log(currentSort)}
{#snippet child({ props })}
  {console.log(props)}
  {@render children(props)}
{/snippet} -->

<Button variant={'outline'} onclick={handleClick} class={twMerge("py-1 px-2 h-auto text-xs", className)}>
  <span class="">{label}</span>
  {#if currentSort}
    {#if currentSort.type == 'asc'  } <ChevronUp /> {/if}
    {#if currentSort.type == 'desc'  } <ChevronDown /> {/if}
  {/if}
</Button>