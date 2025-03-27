<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Megaphone } from "lucide-svelte";
</script>
    
<Dialog.Root open={true}>
    <Dialog.Content>
        <Dialog.Header>
        <Dialog.Title>3월9일 영업종료</Dialog.Title>
        <Dialog.Description>
            <p class="mt-2">
                그동안 저희 코렌초하우스를 찾아주신 모든 분들께 진심으로 감사드립니다. 
                아쉽지만 3월 9일을 마지막으로 영업을 종료합니다.
                모두 건강하시고, 늘 행복하세요! :)
            </p>
            
            <div class="flex ">
                <!-- <Megaphone class="min-w-6 w-6 h-6"/> -->
                <div class="text-lg font-bold leading-6 mt-4 text-green-400 break-keep">
                    주류 정리합니다. 기존 판매가에서 30%할인가에 판매중이니
                    관심있으신 분들은 방문하셔서 좋은 가격에 구매해 가세요😊<span class="text-pink-500">(테이크아웃시 적용)</span>
                </div>
            </div>
        </Dialog.Description>
        </Dialog.Header>   
    </Dialog.Content>
</Dialog.Root>