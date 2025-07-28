<script lang="ts" module>

    import { getContext } from 'svelte';
    import { z } from 'zod';

    // const events:any= getContext('events');

    export const gender = [
        { id: 'male', label: '남' },
        { id: 'female', label: '여' },
    ];
    export const drinks = [
        { id: 'wine', label: '와인' },
        { id: 'whisky', label: '위스키' },
        { id: 'beer', label: '맥주' },
    ];

    export const channels = [
        { id: 'naver_blog', label: '네이버 블로그' },
        { id: 'instagram', label: '인스타그램' },
    ];
    const channelEnum:any= channels.map((ch)=> ch.id);
    const channelKeys = z.enum(channelEnum);

    export const reviewers_schema= ({events}:any) => {
        return ({
            key: z.string({
                required_error: "필수입력", // 값이 `undefined`일 때
                invalid_type_error: "문자열만 입력할 수 있습니다", // 값이 숫자 등 다른 타입일 때
            }),
            name: z.string().nonempty("필수입력"),
            channel: z.array( 
                z.string()
            ).min(1, "한개 이상 선택").default([]),
            
            gender: z.string().nonempty("필수입력").default(''),
            birthday: z.string().optional(),
            link: z.record(channelKeys,
                z.array( 
                    z.object({
                        value: z.string().nonempty("필수입력")
                    }), 
                    { required_error: "한개 이상 입력" }
                ).min(1, '한개 이상 입력')
            ),
            wish_drink: z.array(z.string()).min(1, "한개 이상 선택"),
            phone: z.string().nonempty("필수입력"),
            msg: z.string().optional(),
            events: events ? z.array(z.string()).min(1, "이벤트를 선택해주세요.") : z.array(z.string()).optional(),
            email: z.string().nonempty('필수입력').email('형식을 확인해주세요.'),
            privateAgree: z.literal(true, {
                errorMap: () => ({ message: "개인정보 처리방침에 동의해야 합니다." })
            })
        }
    )}



</script>