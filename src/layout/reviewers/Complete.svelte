<script lang="ts" >
    import { CircleCheckBig } from "lucide-svelte";
    import { Link } from "svelte-routing";
    import Button from "~/lib/components/ui/button/button.svelte";

    let ref
</script>

<div class="w-full max-w-[400px] mx-auto h-56" bind:this={ref}>
    <div class="flex items-center justify-center w-full h-full">
        <div class="border py-4 px-8 rounded-lg ">
            
            <div class="flex items-center">
                <CircleCheckBig strokeWidth={3} class="text-emerald-500 mr-1" />
                <p class="text-lg font-bold">
                    리뷰어 신청이 완료 되었습니다!
                </p>
            </div>
            
            <p class="mt-2 ml-2 text-sm break-keep">
                리뷰어에 선정되시면 결과를 문자로 발송해 드립니다. 보내드린 절차에 맞춰 리뷰어 체험을 진행해 주시면 됩니다.
            </p>

            <p class="mt-2 ml-2 text-sm break-keep">
                관심가지고 리뷰어 모집에 신청해 주셔서 감사합니다.
            </p>
            <Link to={"/"} class="">
                <Button class="bg-emerald-500 mt-4">
                    홈 메뉴로 이동
                </Button>
            </Link>
        </div>

    </div>
</div>