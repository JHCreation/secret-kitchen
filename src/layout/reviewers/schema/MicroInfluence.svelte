<script lang="ts">
    import PromotionImage1 from "~/assets/promotion/promotion-1.webp"

    const details = [
        {
            title: '인스타그램 팔로워수 2천명이상인 분들을 위한 이벤트입니다.',
        },
        {
            title: '인스타 피드(릴스) 추가시 이용금액에서 15,000원을 즉시 할인해 드립니다.',
        },
        {
            title: '광고 캡쳐 + 인스타 팔로우시 추가 10,000원 할인(중복가능 총:25,000원 할인)',
        },
        {
            title: '인스타그램 비공개 계정은 참여 불가합니다.',
        },
        {
            title: '매장 이용금액 5만원 이상시 적용 됩니다.',
        },
    ]
</script>

<div class="mb-10-">
    <img src={PromotionImage1} alt="">

    <div class="py-10 px-4">
        <ul class="list-disc pl-4 break-keep">
            {#each details as detail}
                <li class="text-sm text-gray-700 py-0.5">{detail.title}</li>
            {/each}
        </ul>
    </div>
</div>