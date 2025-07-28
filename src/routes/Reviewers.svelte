<script lang="ts">
    import { setContext } from "svelte";
    import RegisterIndex from "~/layout/reviewers/RegisterIndex.svelte";
    const { events, events_info } = $props();
    setContext('events', { events, events_info});

</script>

<svelte:head>
  <title>시크릿키친 - 리뷰어 모집</title>
  <meta name="description" content={'시크릿키친 리뷰어를 모집합니다.'}>
</svelte:head>

<RegisterIndex />