<script lang="ts">
  import { setContext } from "svelte";
  import RegisterEventsIndex from "~/layout/reviewers/RegisterEventsIndex.svelte";
  import { events, events_info } from "~/layout/reviewers/schema/events";
  // const { events, events_info } = $props();
  setContext('events', { events, events_info});
  const title = `시크릿키친 - 리뷰어${events ? '(이벤트)' : ''} 모집`;
  const description = `시크릿키친 리뷰어${events ? '(이벤트)' : ''}를 모집합니다.`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description}>
</svelte:head>

<RegisterEventsIndex />