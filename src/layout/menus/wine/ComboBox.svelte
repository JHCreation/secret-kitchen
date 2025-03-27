<script lang="ts">
  import { Check } from "lucide-svelte";
  import { ChevronsUpDown} from "lucide-svelte";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { activeCountry } from "~/layout/stores.svelte";

  let{ id, list, setCountry, filters }= $props()
  
  
  
  let open = $state(false);
  // let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);
  
  /* const selected= (list) => {
    const country= list.find((c) => c.code === value)
    setCountry(country?.code)
    return country?.CountryNameKR
  } */
  const selectedValue = $derived(list.find((c) => c.code === filters.country)?.CountryNameKR);
  
  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    /* tick().then(() => {
      triggerRef.focus();
    }); */
  }
  // $inspect('filters', filters, list)
 </script>

{#if $activeCountry}
  <!-- {@const countryList= $activeCountry.find(o=> o.key == id).country} -->
  <!-- {console.log(list)} -->
  <Popover.Root bind:open >
    <Popover.Trigger bind:ref={triggerRef} class="px-2 py-1.5 h-auto text-xs">
      {#snippet child({ props })}
        <Button
          variant="outline"
          class="w-[200px] justify-between"
          {...props}
          role="combobox"
          aria-expanded={open}
          >
            {#if selectedValue}
              {selectedValue}
            {:else}
              {filters.country =='all' ? '전체 국가' : '국가'}
            {/if}
            
            <ChevronsUpDown class="opacity-50" />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-[200px] p-0 relative ">
      <Command.Root>
        <!-- <Command.Input 
          placeholder="국가명을 입력하세요..."
          class="text-xs py-1 h-8"
        /> -->
        <Command.List>
          <Command.Empty>해당 결과 없음.</Command.Empty>
          <Command.Group>
            <Command.Item
              value={'전체'}
              onSelect={() => {
                // value = country.code;
                setCountry('all')
                closeAndFocusTrigger();
                // return filters.country
              }}
              class="px-0 py-0.5 text-xs"
            >
              <Check
                class={cn(filters.country !== 'align-baseline' && "text-transparent")}
              />
              {'전체'}
            </Command.Item>
            {#each list as country}
            <Command.Item
              value={country?.CountryNameKR}
              onSelect={() => {
                // value = country.code;
                setCountry(country?.code)
                closeAndFocusTrigger();
                // return filters.country
              }}
              class="px-0 py-0.5 text-xs"
            >
              <Check
                class={cn(filters.country !== country.code && "text-transparent")}
              />

              <div class="flex items-center">
                <img src={country.image} alt="" class="w-4 h-auto">
                <span class="ml-1"> {country.CountryNameKR} </span>
              </div>
            </Command.Item>
            {/each}
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
   </Popover.Root>
{/if}
 
 