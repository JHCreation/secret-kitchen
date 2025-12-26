<script lang="ts">
  import Button from "~/lib/components/ui/button/button.svelte";
  import { subscribeToNotifications } from "~/utils/pushNotification";
  import Menu from "./Menus.svelte";
  import Menus from "~/layout/menus/Menus.svelte";

  /* async function handleSubscribe() {
      try {
        await subscribeToNotifications();
        alert('Successfully subscribed to notifications!');
      } catch (error) {
        console.error('Subscription failed:', error);
      }
    } */
</script>

<svelte:head>
  <title>시크릿키친 - 홈</title>
  <meta
    name="description"
    content="시크릿키친 : 다양한 와인을 합리적인 가격으로 타파스와 함께 즐길 수 있는 캐주얼 와인바"
  />
</svelte:head>

<Menus />
