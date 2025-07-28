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
    import { getContext } from 'svelte';
    import { drinks, gender } from './schema/reviewer-schema.svelte';
    import Switch from '~/components/ui/custom/switch.svelte';
    // import Switch from '~/lib/components/ui/switch/switch.svelte';

    
    const context:any= getContext('reviewer-ctx');
    const { schema, errors, warnings, touched, addField, data, setTouched, setData, setFields, form, isSubmitting, isValid, isValidating, isDirty, interacted, resetField, reset, unsetField, channels, scrollToElement } = context;

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
    
    const formatNumber = (name)=> (event)=> {
        let value = event.target.value.replace(/\D/g, ""); // 숫자만 남기기
        setData(name, Number(value));
        setFields(name, value)
        return value
    }

    const handleClickSubmit= ()=> {
        console.log($data.privateAgree)
        if( !$isValid && $data.privateAgree ) scrollToElement()
    }

    // let wrapperRef= $state(null)

    let privateChecked= $state(false)
    let privateAgreeOpen= $state(false)
    const setPrivateAgreeOpen= (open)=> {
        privateAgreeOpen= open
    }
    // $inspect('상태체크', $data, $isSubmitting, $isValid, $isValidating, $isDirty, $interacted)
</script>



    <div class="py-5" >
        <div class="flex flex-col gap-3" >

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
                {#if channels?.length > 1}
                    <p class="text-xs mb-1 text-emerald-500">* 다중 선택 가능</p>
                {/if}
                <div class="p-2 border flex flex-col gap-4">
                    {#each channels as channel}
                        {@const index= channel.id}
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
                                    }}
                                />
                                <Label
                                    for={channel.id}
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70"
                                >
                                {channel.label}
                                </Label>
                            </div>
                            {#if $data.channel && $data.channel.includes(index) }
                                <div class="ml-5">
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
                <div class="flex items-center-safe space-x-2">
                    <Switch 
                        id={'privateAgree'} name="privateAgree" 
                        checked={$data.privateAgree == true}
                        onCheckedChange={(checked) => {
                            setTouched('privateAgree', true)
                            setData('privateAgree', checked)
                            // setFields('privateAgree', checked)
                            privateChecked= checked
                        }}
                        
                        class="cursor-pointer" 
                    />
                    <Label
                        for={'privateAgree'}
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[disabled=true]:cursor-not-allowed peer-data-[disabled=true]:opacity-70 flex items-center"
                    >
                        <button onclick={e=> {
                            e.preventDefault()
                            setPrivateAgreeOpen(open)
                        }} class="underline font-semibold">개인정보 수집</button>에 동의 합니다.
                    </Label>
                </div>
            </LabelField>


        
            <PrivateAgree open={privateAgreeOpen} setOpen={setPrivateAgreeOpen}/>

            <Button type="submit" class="w-full mt-4"
                onclick={handleClickSubmit}
            >신청하기</Button>
        </div>
    </div>