<script lang="ts">
  import { menuState } from "../stores.svelte";
  import { getDataFromId } from "./menu";
  import _ from "lodash";
  import { useLocation } from "svelte-routing";
  import queryString from "query-string";
  import { handlerDetailOpen, onDetailOpen } from "./menu_store.svelte";
  
  let { children }= $props()
  const location= useLocation()
  $effect(() => {
    const params= queryString.parse($location.search)
    if( params?.id && params?.key && $menuState ) {
      const { id, key }= params as any
      const { data, info }= getDataFromId({ list: $menuState, key, id })
      onDetailOpen({key, data, info})
    } else {
      handlerDetailOpen(false)
    }
  });
</script>



<div class="mt-5 mb-20 md:mt-10 mx-0.5">
  {@render children?.()}
</div>
