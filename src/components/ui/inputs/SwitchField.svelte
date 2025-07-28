<script lang="ts">
    import LabelField from "./LabelField.svelte";
    import { getContext } from "svelte";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import _ from "lodash";
    import { Label } from "~/lib/components/ui/label/index.js";

    const { ctx, id, key, name, selectOption, required=false }= $props()
    const { schema, errors, warnings, touched, addField, data, setTouched, setData, setFields, setIsDirty, defaultValues }:any = getContext(ctx);

    // const currentSchema= schema[id]
    
    // const key = currentSchema.key
    // const name = currentSchema.name
    // const selectOption= currentSchema.selectOption

    const checked= selectOption[0]
    const unChecked= selectOption[1]
    
    const handleChange= (val)=> {
        const selete= val ? checked.value : unChecked.value
        setIsDirty(true)
        setTouched(key, true)
        setData(key,selete)
        // setFields(key, selete)
    }
</script>


<LabelField label={name} {required} name={key} err={$errors} warn={$warnings}>
    <div class="flex items-center-safe space-x-2">
        <Switch 
            checked={$data[key] == checked.value}
            onCheckedChange={handleChange}
            class="cursor-pointer" 
        />
        <Label class="text-xs">{_.find(selectOption, { value: $data[key] }).name}</Label>
    </div>
</LabelField>