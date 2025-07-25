<script lang="ts">
  import MenuGrid from "../item/MenuGrid.svelte";
  import { menuState } from "../../stores.svelte";
  import _ from "lodash";
    import MenuWrap from "../MenuWrap.svelte";
    import { menuType } from "../menu";
    import ItemNotice from "../_com/ItemNotice.svelte";

  const id= 'liqueur';
  let list= $derived($menuState?.[id] ?? [])

  const notice= [
    { msg: '드시다가 남은 위스키는 포장해드려요.' },
    // { msg: '테이크아웃시 할인 적용됩니다. -25,000원' },
  ]
</script>


<MenuWrap>
  <div class="mb-4 border- w-full max-w-[400px] mx-auto p-3 rounded-sm">
    <h1 class="font-[family-name:var(--font-type-en)] text-center text-5xl leading-[1.4]">{menuType[id].name}</h1>
    <ItemNotice notice={notice}/>
    
  </div>
  <MenuGrid id={id} list={list} />
</MenuWrap>