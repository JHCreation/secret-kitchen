<script>
//   import { Link } from "@hvniel/svelte-router";
  import TranslateCustom from "~/components/TranslateCustom.svelte";
  import { viewWidget } from "~/components/TranslateCustom.svelte";
  import { cn } from "~/lib/utils";
  import Logo from "~/assets/logo/logo.svg";
  import { Link } from "svelte-routing";
</script>

<header class={cn("w-full fixed top-0 left-0 z-50 bg-background border-b", {
  "top-9": $viewWidget,
})}>
  <div class="flex justify-between items-center p-2">
    <Link to="/">
      <img src={Logo} alt="logo" class="w-20 ml-4" />
    </Link>
    <div class="flex items-center gap-2">
      <TranslateCustom />
    </div>
  </div>

</header>   