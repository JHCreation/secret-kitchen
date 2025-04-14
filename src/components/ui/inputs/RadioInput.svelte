<script lang="ts" module>
    export type RadioInputOptionType = RadioInputItemType[]
    export type RadioInputItemType= {
        id: string
        label: string
    };
</script>
<script lang="ts">
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import Label from "~/lib/components/ui/label/label.svelte";
    let { options, name, setTouched, setData, setFields }= $props()
    // let selectedValue
    
</script>


<RadioGroup.Root class="flex gap-4"
    onValueChange={value=> {
        setFields(name, value)
        setTouched(name, true)
        setData(name, value);
    }}
>

    {#each options as item}
        <div class="flex items-center space-x-1 cursor-pointer">
            <RadioGroup.Item 
                value={item.id} id={item.id} name={name}
            />
            <Label for={item.id} class="cursor-pointer">{item.label}</Label>
        </div>
    {/each}
</RadioGroup.Root>
