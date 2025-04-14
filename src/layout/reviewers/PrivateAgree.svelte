<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import Button from "~/lib/components/ui/button/button.svelte";
    import Checkbox from "~/lib/components/ui/checkbox/checkbox.svelte";
    import ScrollArea from "~/lib/components/ui/scroll-area/scroll-area.svelte";

    let { open, setOpen }= $props()
    // let open= $state(false)
    const onOpen= (open)=> {
        setOpen(open)
        // open= open
    }
</script>


{#snippet part1(text)}
    <p class="text-sm text-slate-500 font-semibold"> {@html text} </p>
{/snippet}

{#snippet part2(text)}
    <p class="text-xs ml-2 my-1">- {text} </p>
{/snippet}
<Dialog.Root open={open} onOpenChange={onOpen} >
    <Dialog.Content class={``}>
        <Dialog.Header class="">
            <Dialog.Title>개인정보 수집 및 이용 동의서</Dialog.Title>
            
        </Dialog.Header>
        <ScrollArea class="my-0 px-3">

        <div class="w-full relative max-h-[calc(100dvh-120px)]">
            <!-- <h1 class="">개인정보 수집 및 이용 동의서</h1> -->
            
            <div class="">
                <ul class="">
                    <li class="py-1">
                        {@render part1("1. 개인정보의 수집 및 이용 목적")}
                        {@render part2("본 매장은 체험단 신청 접수 및 운영을 위해 아래와 같은 개인정보를 수집합니다. 수집된 개인정보는 체험단 선정, 체험활동 안내, 이벤트 관련 소통, 만족도 조사 및 마케팅 활용 목적으로 이용됩니다.")}
                    </li>
                    <li class="py-1">
                        {@render part1("2. 수집하는 개인정보 항목")}
                        {@render part2("필수정보: 이름, 연락처(휴대전화 번호), 이메일 주소, 블로그, SNS 계정(ID, url 링크)")}
                    </li>

                    <li class="py-1">
                        {@render part1("3. 개인정보의 보유 및 이용 기간")}
                        {@render part2("필수집된 개인정보는 체험단 활동 종료 후 6개월까지 보관되며, 해당 기간이 지나면 지체 없이 파기됩니다. 단, 관련 법령에 의해 보존할 필요가 있는 경우 해당 법령에 따라 보관될 수 있습니다.")}
                    </li>
                    <li class="py-1">
                        {@render part1("4. 개인정보 제공 및 위탁")}
                        {@render part2("본 매장은 원칙적으로 수집된 개인정보를 외부에 제공하지 않습니다. 다만, 원활한 서비스 제공을 위해 필요한 경우 동의 받은 범위 내에서 최소한의 정보만을 위탁할 수 있으며, 이 경우 사전 공지 후 동의를 받습니다.")}
                    </li>
                    <li class="py-1">
                        {@render part1("5. 동의 거부권 및 불이익")}
                        {@render part2("개인정보 제공에 동의하지 않으실 수 있으며, 이 경우 체험단 신청이 제한될 수 있습니다.")}
                    </li>

                    
                </ul>
            </div>
        </div>
        </ScrollArea>
        <Dialog.Footer class="">
            <Button size="sm" onclick={e=> onOpen(false)} class="text-sm">닫기</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>