<script lang="ts">
  import MenuGrid from "../item/tapas/MenuGrid.svelte";
  import { menuState } from "../../stores.svelte";
  import _ from "lodash";
    import MenuWrap from "../MenuWrap.svelte";
    import { menuType } from "../menu";
    import ItemNotice from "../ItemNotice.svelte";

  const id= 'tapas';
  let list= $derived($menuState?.[id] ?? [])

  const notice= [
    { msg: '특급호텔 출신 셰프가 최상의 요리를 제공합니다.' },
    { msg: '계절에 따른 시즌 메뉴가 변동됩니다.' },
  ]
</script>



<MenuWrap>
  <!-- <h1 class="font-[family-name:var(--font-type-en)] text-center text-5xl leading-[1.4]">{menuType[id].name}</h1> -->
  <div class="mb-4 border- w-full max-w-[400px] mx-auto p-3 rounded-sm">
    <h1 class="font-[family-name:var(--font-type-en)] text-center text-5xl leading-[1.4]">{menuType[id].name}</h1>
    <ItemNotice notice={notice}/>
    
  </div>
  <MenuGrid id={id} list={list} />
</MenuWrap>