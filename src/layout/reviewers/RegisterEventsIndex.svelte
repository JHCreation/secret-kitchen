<script lang="ts">
    import { validator } from '@felte/validator-zod';
    import { z } from 'zod';
    import { createForm } from 'felte';
    import Input from '~/lib/components/ui/input/input.svelte';
    import Button from '~/lib/components/ui/button/button.svelte';
    import LabelField from '~/components/ui/inputs/LabelField.svelte';
    import Label from '~/lib/components/ui/label/label.svelte';
    import Checkbox from '~/lib/components/ui/checkbox/checkbox.svelte';
    import { generateShortId } from '~/utils/uid';
    import Loading from '~/components/ui/Loading.svelte';
    import Complete from './Complete.svelte';

    import { getContext, setContext } from 'svelte';
    import { channels, reviewers_schema } from './schema/reviewer-schema.svelte';
    import FormsEvent from './FormsEvent.svelte';
    import { cn } from '~/lib/utils';
    import CompleteEvent from './CompleteEvent.svelte';

    const { events, events_info }:any= getContext('events');
    const schema = z.object(reviewers_schema({events}));
    
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
    
    
    function handleCheckboxChange(name, selected: string[], value: string, checked: boolean) {
        let selete;
        if (checked) {
            selete = [...selected, value];
        } else {
            selete = selected.filter(i => i !== value);
        }
        setTouched(name, true)
        setData(name, selete);
        // setFields(name, selete)
    }
    
    let wrapperRef= $state(null)
    function scrollToElement() {
        wrapperRef?.scrollIntoView({ behavior: 'smooth', block: "start" });
    }
    
    const context= setContext('reviewer-ctx', {
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
    let nextStep= $state(false)
    const handleNextStep= ()=> {
        setTouched('events', true)
        console.log($data['events'], $errors)
        if( $errors['events'] ) {
            // alert($errors['events'])
            return
        }
        nextStep= !nextStep
        setTimeout(() => {
            if( nextStep ) {
                wrapperRef?.scrollIntoView({ behavior: 'smooth', block: "start" });
            }
        }, 100)
    }
    $inspect('상태체크', $data, $isSubmitting, $isValid, $isValidating, $isDirty, $interacted)
</script>


{#if loading}
    <div class="w-full min-h-dvh flex items-center justify-center">
        <div class="w-40">
            <Loading />
        </div>
    </div>
{/if}
{#if isSubmitted }
    <div class="h-dvh flex flex-col justify-center items-center px-3">
        <CompleteEvent />
    </div>
{/if}



{#if !isSubmitted && !loading }
<div class=" flex flex-col justify-center w-full max-w-container-xs mx-auto min-h-dvh pt-0 pb-20" >
    
    <form use:form class="w-full">
        <div class="">
            {#if events_info}
                <events_info.component/>
            {/if}
            {#if events }
                <div class="px-2 md:px-0">
                    <LabelField label={'이벤트'} required name={"events"} err={$errors} warn={$warnings} class="py-10 px-4">
                        <!-- <p class="text-xs mb-2 text-emerald-500">* 다중 선택 가능</p> -->
                        <div class="flex flex-col gap-6">
                            {#each events as item, index}
                                <div class="flex items-center space-x-2">
                                    <Checkbox
                                        id={`events-${item.id}`} name="events" value={item.id}
                                        checked={$data?.['events']?.includes(item.id)}
                                        onCheckedChange={(checked) => handleCheckboxChange('events', $data['events'], item.id, checked)}
                                        disabled={nextStep}
                                    />
                                    <Label
                                        for={`events-${item.id}`}
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
                                    >
                                        {item.label}
                                    </Label>
                                </div>
                                <p class="">
                                    {@html item.detail ? item.detail : ''}
                                </p>
                            {/each}
                        </div>
                    </LabelField>
            
                    <div class="flex items-center justify-end mt-">
                        <Button onclick={handleNextStep} size="sm" class="w-full mt-5">{nextStep ? '이전' : '다음'}</Button>
                    </div>
                </div>
            {/if}
        </div>
        
        {#if (!events || ((events && $data?.events?.length > 0) && nextStep))  }

        <div class="border md:border-0 border-gray-200 rounded-lg px-2 md:px-0 mt-4" bind:this={wrapperRef}>
            <FormsEvent />
        </div>

        {/if}

    </form>


</div>

{/if}