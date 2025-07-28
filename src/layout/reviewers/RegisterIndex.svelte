<script lang="ts">
    import { validator } from '@felte/validator-zod';
    import { z } from 'zod';
    import { createForm } from 'felte';
    import { generateShortId } from '~/utils/uid';
    import Loading from '~/components/ui/Loading.svelte';
    import Complete from './Complete.svelte';
    import { getContext, setContext } from 'svelte';
    import { channels, reviewers_schema } from './schema/reviewer-schema.svelte';
    import FormsEvent from './FormsEvent.svelte';
    import Description from './schema/Description.svelte';

    const { events, events_info }:any= getContext('events');
    $inspect(events, 'events context')
    const schema = z.object(reviewers_schema({events}));

    const warnSchema = z.object({
        password: z.string()
        .refine((value) => (value ? value.length > 8 : true), {
            message: '비번 더',
        }),
    });
    
    let newChannels = channels;
    if (events) {
        newChannels = channels.filter((ch) => {
            if( ch.id === 'instagram' ) {
                return true
            }
        });
    }
    const defatultValues = {
        key: generateShortId(8),
        privateAgree: false,
        events: events ? [] : undefined, 
        channel: events ? [] : undefined, 
    }
    // if( events ) {
    //     defatultValues['event'] = events
    // }
    const initialValues = schema.partial().parse({});

    let submitted= $state()
    let loading= $state(false)
    let isSubmitted= $state(false)
    const { form, errors, warnings, touched, isSubmitting, isValid, isValidating, isDirty, interacted, data, setData, setTouched, resetField, reset, setFields, addField, unsetField } = createForm({
        initialValues: {
            ...initialValues,
            ...defatultValues,
            // key: generateShortId(8),
            // privateAgree: false
        },
        
        extend: [
            validator({ schema }),
            // validator({ schema: warnSchema, level: 'warning' }),
        ], // OR `extend: [validator],`
        onSubmit: async (values, context)=> {
            submitted= values
            console.log(values, context)
            loading = true
            // await new Promise(resolve => setTimeout(resolve, 2000));
            // return 'success'
            const parseValue:any= values
            parseValue.channel= JSON.stringify(values.channel)
            parseValue.link= JSON.stringify(values.link)
            parseValue.wish_drink= JSON.stringify(values.wish_drink)
            const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/reviewers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parseValue)
            })
            const result= await res.json()
            console.log(result)
            return result
        },
        onSuccess(response:any, context) {
            console.log(response)
            if( response && response?.status == 'success'){
                loading= false
                isSubmitted= true
                reset();
            }
            // Do something with the returned value from `onSubmit`.
        },
        onError(err, context) {
            console.log(err)
            // Do something with the error thrown from `onSubmit`.
        },
    })
    
    
    let wrapperRef= $state(null)
    function scrollToElement() {
        wrapperRef?.scrollIntoView({ behavior: 'smooth', block: "start" });
    }
    
    setContext('reviewer-ctx', {
        schema,
        errors,
        warnings,
        touched,
        addField,
        data,
        setTouched,
        setData,
        setFields,
        form, isSubmitting, isValid, isValidating, isDirty, interacted,  resetField, reset, unsetField,
        channels:newChannels,
        scrollToElement
    })
    
    $inspect('상태체크 일반 리뷰어', $data, $isSubmitting, $isValid, $isValidating, $isDirty, $interacted)
</script>


{#if loading}
    <div class="w-full min-h-dvh flex items-center justify-center">
        <div class="w-40">
            <Loading />
        </div>
    </div>
{/if}
{#if isSubmitted }
    <div class="h-dvh flex flex-col justify-center items-center px-2">
        <Complete />
    </div>
{/if}



{#if !isSubmitted && !loading }
<div class="w-full max-w-container-xs mx-auto min-h-dvh pb-20 flex flex-col justify-center" >
    
    <form use:form class="w-full">
        <div class="mt-0 md:mt-4" bind:this={wrapperRef}>
            <Description />
            <div class="px-2 md:px-0">
                <FormsEvent />
            </div>
        </div>
    </form>
</div>

{/if}