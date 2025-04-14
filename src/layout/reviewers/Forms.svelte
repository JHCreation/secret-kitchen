<script lang="ts">
    import { validator } from '@felte/validator-zod';
    import { z } from 'zod';
    import { createForm } from 'felte';
    import Input from '~/lib/components/ui/input/input.svelte';
    import Button from '~/lib/components/ui/button/button.svelte';
    import LabelField from '~/components/ui/inputs/LabelField.svelte';
    import Label from '~/lib/components/ui/label/label.svelte';
    import Checkbox from '~/lib/components/ui/checkbox/checkbox.svelte';
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import RadioInput from '~/components/ui/inputs/RadioInput.svelte';
    import Textarea from '~/lib/components/ui/textarea/textarea.svelte';
    import { generateShortId } from '~/utils/uid';
    import Loading from '~/components/ui/Loading.svelte';
    import Complete from './Complete.svelte';
    import PrivateAgree from './PrivateAgree.svelte';

    const channels = [
        { id: 'naver_blog', label: '네이버 블로그' },
        { id: 'instagram', label: '인스타그램' },
    ];
    const channelEnum:any= channels.map((ch)=> ch.id);
    const channelKeys = z.enum(channelEnum);
    const schema = z.object({
        key: z.string({
            required_error: "필수입력", // 값이 `undefined`일 때
            invalid_type_error: "문자열만 입력할 수 있습니다", // 값이 숫자 등 다른 타입일 때
        }),
        name: z.string().nonempty("필수입력"),
        channel: z.array( 
            z.string()
        ).min(1, "한개 이상 선택").default([]),
        /* channel: z.array(z.object({
            id: z.string(),
            value: z.boolean()
        })
        ).min(1, "한개 이상 선택").default([]), */
        // channels: z.array(z.string()).min(2, "Please select at least one option"),
        gender: z.string().nonempty("필수입력").default(''),
        birthday: z.string().optional()
        // .length(8, { message: "8자리 입력" })
        ,
        /* link: z.array(z.object({
            id: z.string().nonempty("필수입력"),
            value: z.array( z.object({
                value: z.string().nonempty("필수입력")
            }), {
                required_error: "한개 이상 입력"
            } ).min(1, '한개 이상 입력')
        })).min(1, '한개 이상 입력'), */
        link: z.record(channelKeys,
            z.array( 
                z.object({
                    value: z.string().nonempty("필수입력")
                }), 
                { required_error: "한개 이상 입력" }
            ).min(1, '한개 이상 입력')
            /* z.object({
                id: z.string().nonempty("필수입력"),
                value: z.array( 
                    z.object({
                        value: z.string().nonempty("필수입력")
                    }), 
                    { required_error: "한개 이상 입력" }
                ).min(1, '한개 이상 입력')
            }) */
        ),
        /* link: z.array(z.object({
            id: z.string().nonempty("필수입력."),
            value: z.array( 
                z.string().nonempty("필수입력..")
            ).min(1, '한개 이상 입력!')
        })).min(1, '한개 이상 입력.'), */
        wish_drink: z.array(z.string()).min(1, "한개 이상 선택"),
        phone: z.string().nonempty("필수입력"),
        msg: z.string().optional(),
        email: z.string().nonempty('필수입력').email('형식을 확인해주세요.'),
        privateAgree: z.literal(true, {
            errorMap: () => ({ message: "개인정보 처리방침에 동의해야 합니다." })

        })
    });

    console.log(schema)

    const warnSchema = z.object({
        password: z.string()
        .refine((value) => (value ? value.length > 8 : true), {
            message: '비번 더',
        }),
    });
    
    const initialValues = schema.partial().parse({
        // gender: ''
        // channel: ['']
    });

    let submitted= $state()
    let loading= $state(false)
    let isSubmitted= $state(false)
    const { form, errors, warnings, touched, isSubmitting, isValid, isValidating, isDirty, interacted, data, setData, setTouched, resetField, reset, setFields, addField, unsetField } = createForm({
        initialValues: {
            ...initialValues,
            key: generateShortId(8),
            privateAgree: false
            // channel: [],
            // gender: ''
        },
        
        extend: [
            validator({ schema }),
            validator({ schema: warnSchema, level: 'warning' }),
        ], // OR `extend: [validator],`
        onSubmit: async (values, context)=> {
            // return false;
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
        setFields(name, selete)
    }

   /*  const handleChannelChange= ({
        name, data, value, checked
    })=> {
        let selete;
        if (checked) {
            selete = [...data, { value }];
        } else {
            selete = data.filter(i => i.value !== value);
        }
        setTouched(name, true)
        setData(name, selete);
        setFields(name, selete)
    } */

    const gender = [
        { id: 'male', label: '남' },
        { id: 'female', label: '여' },
    ];
    const drinks = [
        { id: 'wine', label: '와인' },
        { id: 'whisky', label: '위스키' },
        { id: 'beer', label: '맥주' },
    ];
    /* let selectedGender = $state('');
    const setSelected= (value)=> {
        selectedGender= value
    } */
    
    const formatNumber = (name)=> (event)=> {
        let value = event.target.value.replace(/\D/g, ""); // 숫자만 남기기
        setData(name, Number(value));
        setFields(name, value)
        // event.target.value= value
        return value
        // setFields("age", value ? parseInt(value, 10) : "");
    }


    // let touchedSubmit= $state(false)

    const handleClickSubmit= ()=> {
        console.log($data.privateAgree)
        if( !$isValid && $data.privateAgree ) scrollToElement()
    }

    let wrapperRef= $state(null)
    function scrollToElement() {
        wrapperRef?.scrollIntoView({ behavior: 'smooth', block: "start" });
    }



    let privateChecked= $state(false)
    let privateAgreeOpen= $state(false)
    const setPrivateAgreeOpen= (open)=> {
        privateAgreeOpen= open
    }
    // $inspect('상태체크', $isSubmitting, $isValid, $isValidating, $isDirty, $interacted)
</script>

<!-- <div class="mt-24"></div>
{#if $data}
<h2>Current data shape:</h2>
<pre>
{JSON.stringify($data, null, 2)}
</pre>
{/if}


{#if submitted}
<h2>Submitted data:</h2>
<pre>
{JSON.stringify(submitted, null, 2)}
</pre>
{/if} -->

{#if loading}
    <div class="w-full min-h-56 flex items-center justify-center">
        <div class="w-40">
            <Loading />
        </div>
    </div>
{/if}
{#if isSubmitted }
    <Complete />
{/if}



{#if !isSubmitted && !loading }
    <div class="py-5" bind:this={wrapperRef}>
        <form use:form class="flex flex-col gap-3" >
            <!-- <Input name="id" disabled />  -->
            <!-- <LabelField label={'이메일'} component={Input} name='email' /> -->
            <LabelField label={'이메일'} required name={"email"} err={$errors} warn={$warnings}>
                <Input name="email" />
            </LabelField>
            <LabelField label={'이름'} required name={"name"} err={$errors} warn={$warnings}>
                <Input type="text" name="name" />
            </LabelField>
            <LabelField label={'연락처'} required name={"phone"} err={$errors} warn={$warnings}>
                <p class="text-xs mb-2 text-emerald-500">* 숫자만 입력</p>
                <Input type="text" name="phone" oninput={formatNumber('phone')} placeholder={"ex) 01012345678"} class="placeholder:text-gray-300"/>
            </LabelField>
            <LabelField label={'채널'} required name={"channel"} err={$errors} warn={$warnings}>
                <p class="text-xs mb-1 text-emerald-500">* 다중 선택 가능</p>
                <div class="p-2 border flex flex-col gap-4">
                    <!-- {#each channels as channel, index(channel.id)} -->
                    {#each channels as channel}
                        {@const index= channel.id}
                        <!-- {console.log(`chanelllllllll${index}`, $data.channel, $data.channel && $data.channel.includes(channel.id))} -->
                        <div class="">
                            <div class="flex items-center space-x-2">
                                <Checkbox
                                    id={channel.id} 
                                    name="channel"
                                    value={channel.id}
                                    onCheckedChange={(checked) => {
                                        handleCheckboxChange('channel', $data.channel, channel.id, checked)
                                        if( !checked ) unsetField(`link.${index}`)
                                        if( checked ) setFields(`link.${index}.0.value`, '')
                                        /* return handleChannelChange({
                                            name: 'channel', 
                                            data: $data['channel'][index], 
                                            value: channel.id, 
                                            checked
                                        }) */
                                    }}
                                />
                                <Label
                                    for={channel.id}
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
                                >
                                {channel.label}
                                </Label>
                            </div>
                            <!-- {#if $data.channel && $data.channel.find(o=> o.id == channel.id) } -->
                            <!-- {console.log($data.channel && $data.channel.includes(index), index)} -->
                            {#if $data.channel && $data.channel.includes(index) }
                                <!-- {@const links= $data?.link?.[index]?.value} -->
                                <!-- {console.log(index, $data?.link?.[index]?.value, $errors?.link?.[index]?.value, links)} -->
                                <!-- {!($data?.link?.[index]?.value) && addField(`link.${index}.value`, '')} -->
                                <div class="ml-5">
                                    <!-- <input type="text" name="link.{index}" disabled class="hidden"> -->
                                    <!-- <input type="text" name="link.{index}.id" value={channel.id} disabled class="hidden"> -->
                                    <LabelField
                                        label={`${channel.label} 링크`}
                                        required
                                        name="link.{index}"
                                        err={$errors}
                                        error={
                                            null
                                        // $errors?.link?.[index]?.value
                                        }
                                        warn={$warnings}
                                        class="m-0"
                                    >
                                        <p class="text-xs mb-1 text-emerald-500">* 다중 입력 가능 (링크추가)</p>
                                        <div class="flex flex-col gap-1">
                                            {#each $data?.link?.[index] as link, idx(link.key)}
                                            <!-- {#each Object.keys($data?.link) as key}
                                                {@const link= $data?.link[key].value } -->
                                                <div class="flex">
                                                    <LabelField
                                                        label={`${idx+1}. url 링크`}
                                                        required
                                                        name="link.{index}.{idx}.value"
                                                        err={$errors}
                                                        warn={$warnings}
                                                        class="m-0 w-full"
                                                    >
                                                        <div class="flex w-full">
                                                            <Input
                                                                data-felte-keep-on-remove
                                                                type="text" 
                                                                name="link.{index}.{idx}.value"
                                                                oninput={(e:any)=> {
                                                                // console.log(e)
                                                                    setTouched(`link.${index}.${idx}.value`, true)
                                                                    setFields(`link.${index}.${idx}.value`, e.target.value)
                                                                }}
                                                            />
                                                            <Button
                                                                size={"icon"} variant="destructive" class=" min-w-12 ml-2"
                                                                onclick={e=> {
                                                                    // resetField(`link.${index}.value.${idx}`)
                                                                    unsetField(`link.${index}.${idx}`)
                                                                    // removeLink(`link.${index}.value`, idx)
                                                                }}
                                                            >삭제</Button>
                                                        </div>
                                                    </LabelField>
        
        
                                                    <!-- <LabelField
                                                        label={``}
                                                        required
                                                        name="link.{index}.value.{idx}"
                                                        err={$errors}
                                                        warn={$warnings}
                                                        class="m-0"
                                                    >
                                                        <Input data-felte-keep-on-remove type="text" name="link.{index}.value.{idx}"
                                                        oninput={(e:any)=> {
                                                            // console.log(e)
                                                            setTouched(`link.${index}.value.${idx}`, true)
                                                            setFields(`link.${index}.value.${idx}`, e.target.value)
                                                        }}/>
                                                    </LabelField> -->
        
                                                </div>
                                            {/each}
                                        </div>
        
                                        <Button
                                            class="mt-2 bg-cyan-500"
                                            onclick={e=>{
                                                console.log($data, index)
                                                // addField(`link.${index}.value`, '')
                                                addField(`link.${index}`, {value: ''})
                                                // resetField()
                                            }}
                                        >링크 추가</Button>
                                    </LabelField>
                                </div>
                            {/if}
                        </div>
        
                    {/each}
        
                </div>
            </LabelField>
            <LabelField label={'성별'} required name={"gender"} err={$errors} warn={$warnings}>
                <RadioInput
                    name={'gender'}
                    options={gender}
                    setTouched={setTouched}
                    setData={setData}
                    setFields={setFields}
                />
            </LabelField>
            <LabelField label={'관심주류'} required name={"wish_drink"} err={$errors} warn={$warnings}>
                <p class="text-xs mb-2 text-emerald-500">* 다중 선택 가능</p>
                <div class="flex gap-6">
                    {#each drinks as drink, index}
                        <div class="flex items-center space-x-2">
                            <Checkbox
                                id={drink.id} name="wish_drink" value={drink.id}
                                checked={$data?.wish_drink?.includes(drink.id)}
                                onCheckedChange={(checked) => handleCheckboxChange('wish_drink', $data.wish_drink, drink.id, checked)}
                            />
                            <Label
                                for={drink.id}
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
                            >
                            {drink.label}
                            </Label>
                        </div>
                    {/each}
                </div>
            </LabelField>

            <LabelField label={'생년월일'} name={"birthday"} err={$errors} warn={$warnings}>
                <p class="text-xs mb-2 text-emerald-500">* 숫자만 입력</p>
                <Input type="text" name="birthday" oninput={formatNumber('birthday')} placeholder={"ex) 19950614"} class="placeholder:text-gray-300"/>
            </LabelField>

            <LabelField label={'메세지'} name={"msg"} err={$errors} warn={$warnings}>
                <Textarea name="msg"/>
            </LabelField>
  
            <LabelField label={''} name={"privateAgree"} err={$errors} warn={$warnings} class="border-none p-0 mt-4">
                <div class="flex gap-6">
                        <div class="flex items-center space-x-2">
                            <Checkbox
                                id={'privateAgree'} name="privateAgree" 
                                bind:checked={$data.privateAgree}
                                class="data-[state=checked]:bg-emerald-500"
                            />
                            <Label
                                for={'privateAgree'}
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
                            >
                            <button onclick={e=> {
                                e.preventDefault()
                                setPrivateAgreeOpen(open)
                            }} class="underline font-semibold">개인정보 수집</button>에 동의 합니다.
                            </Label>
                        </div>
                </div>
            </LabelField>
            <PrivateAgree open={privateAgreeOpen} setOpen={setPrivateAgreeOpen}/>

            <Button type="submit" class="w-full mt-4"
                onclick={handleClickSubmit}
            >신청하기</Button>
        </form>
    </div>
{/if}



<!-- <pre> -->
<!-- {JSON.stringify($errors, null, 2)} -->
<!-- {JSON.stringify($warnings, null, 2)} -->
<!-- </pre>   -->


<!-- <p class="">터치</p>
<pre>
{JSON.stringify($touched, null, 2)}
</pre> -->