<script lang="ts" >
    import { CircleCheckBig } from "lucide-svelte";
    import { Link } from "svelte-routing";
    import Button from "~/lib/components/ui/button/button.svelte";

    let ref
</script>

<div class="w-full max-w-[400px] mx-auto h-56" bind:this={ref}>
    <div class="flex items-center justify-center w-full h-full">
        <div class="border py-4 px-5 rounded-lg ">
            
            <div class="flex items-center">
                <CircleCheckBig strokeWidth={3} class="text-emerald-500 mr-1" />
                <p class="text-lg font-bold">
                    이벤트 신청이 완료 되었습니다!
                </p>
            </div>
            
            <p class="mt-2 ml-2 text-sm break-keep">
                매장에 방문하셔서 이용전에 이벤트 참여 확인후, 이용해 주시면 감사하겠습니다.
            </p>

            <p class="mt-2 ml-2 text-sm break-keep">
                저희 이벤트에 관심가지고 신청해 주셔서 감사합니다.
            </p>
            <Link to={"/"} class="">
                <Button class="bg-emerald-500 mt-4">
                    홈 메뉴로 이동
                </Button>
            </Link>
        </div>

    </div>
</div>