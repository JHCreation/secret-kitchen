<script lang="ts">
  import Wine from "../layout/menus/wine/Wine.svelte"
  let { type= 'all' }= $props()
</script>

<svelte:head>
  <title>시크릿키친 - 와인</title>
  <meta name="description" content={'코렌초하우스 와인입니다.'}>
</svelte:head>

<Wine type={type}/>