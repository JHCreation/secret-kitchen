<script lang="ts">
  import Menus from "./Menus.svelte"
  import { useLocation } from "svelte-routing";
  import MenuWrap from "./MenuWrap.svelte";
  // let { location } = $props()
  // console.log(location)
  const location= useLocation()
  /* onMount(()=>{
    
    
  })
  $effect(()=> {
    const params= QueryString.parse($location.search)
    if( params?.id && params?.key && $menuState ) {
      const { id, key }= params as any
      const { data, info }= getDataFromId({ list: $menuState, key, id })
      onDetailOpen({key, data, info})
    } else {
      handlerDetailOpen(false)
    }
  }) */

</script>


<div class="mx-2">
  <MenuWrap>
    <Menus />
  </MenuWrap>
</div>