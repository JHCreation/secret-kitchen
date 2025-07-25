<script lang="ts">
    import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
    import { MoveRight } from "lucide-svelte";
    import { MoveLeft } from "lucide-svelte";
    import { Button } from "~/lib/components/ui/button/index.js";
    import { cn } from "~/lib/utils";
    import Promotion1 from "~/assets/promotion/promotion-1.webp";
    import Promotion2 from "~/assets/promotion/promotion-2.webp";
    import Promotion3 from "~/assets/promotion/promotion-3.jpg";

    const promotions= [
        // { img: Promotion1, alt: "Promotion Banner 1" },
        { img: Promotion2, alt: "Promotion Banner 2" },
        // { img: Promotion3, alt: "Promotion Banner 3" },
    ];
    const isOne= promotions.length == 1;
</script>


{#snippet arrow_buttons( className = '', children = null )}
    {@const Icon= children}
    <Button size={'sm'} class={cn("bg-white/20 border-slate-600- border- text-slate-600 hover:text-slate-200 p-1.5 md:p-2.5 h-auto touch-manipulation size-8 [&_svg]:size-6 ", className)} >
        <Icon strokeWidth={1}/>
    </Button>
{/snippet}

<div class="relative ">
    <Splide 
        aria-label={"Promotion Banner"}
        class="w-full mt-4"
        hasTrack={false}
        options={{
            // width : 800,
            // drag: 'free',
            snap: true,
            speed: 400,
            type: isOne ? 'fade' : 'loop',
            pauseOnHover: false,
            rewind : true,
            autoplay: isOne ? false : true,
            arrows: !isOne,
            // perPage: 28,
            // gap: 5,
            // padding: { left: 0, right: 50 },
            // breakpoints: {
            //     3400: { perPage: 16, perMove: 5, },
            //     2400: { perPage: 12, perMove: 5, },
            //     2000: { perPage: 12, perMove: 5, },
            //     1500: { perPage: 8, perMove: 5, },
            //     960: { perPage: 5, perMove: 5, },
            //     780: { perPage: 4, perMove: 4,},
            //     640 : { perPage: 4, perMove: 1,},
            //     480 : { perPage: 4, perMove: 1, padding: {right:20},},
            // },
            flickPower: 600,
            flickMaxPages: 1,
            dragMinThreshold: {
                mouse: 0,
                touch: 10,
            },
        }}
        >
        {#if promotions.length > 1}
        <div class="splide__arrows absolute top-1/2 -translate-y-1/2 z-10 px-2 w-full flex justify-between items-center">
            {@render arrow_buttons('splide__arrow splide__arrow--prev', MoveLeft)}
            {@render arrow_buttons('splide__arrow splide__arrow--next', MoveRight)}
        </div>
        {/if}

        <SplideTrack class="mt-2">
            {#each promotions as promo}
                <SplideSlide class="flex">
                    <div class="">
                        <img src={promo.img} alt={promo.alt} class="w-full h-full object-contain">
                    </div>
                </SplideSlide>
            {/each}
            
        </SplideTrack>
        </Splide>
</div>