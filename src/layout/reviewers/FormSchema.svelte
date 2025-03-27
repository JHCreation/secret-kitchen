<script lang="ts" module>
    import { z } from 'zod';
    export const filedSchema= {
        id: z.string({
            required_error: "필수입력", // 값이 `undefined`일 때
            invalid_type_error: "문자열만 입력할 수 있습니다", // 값이 숫자 등 다른 타입일 때
        }).default('testId'),
        name: z.string(),
        channel: z.array(z.string()),
        email: z.string().email('형식x').nonempty('없어'),
        password: z.string().nonempty('비번입력'),
    }

    
</script>