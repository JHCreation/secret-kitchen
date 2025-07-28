<script lang="ts">
    import clsx from "clsx";
    import _ from "lodash";
    import { cn } from "~/utils/cn.svelte";

    let { 
        children, 
        required= false,
        label= '', 
        name,
        class: className= '', 
        err=null, 
        error=null,
        warn=null, 
        component:Component= null, 
        ...restProps 
    }= $props()
    // $inspect('children', cn("border border-cyan-600 p-2 rounded-md", className))
    // $inspect(name, error, error != null, err[name])
    function isEmptyOrNull(item) {
        return _.isNull(item) || _.isEmpty(item);
    }
    const vaild= (errors) => {
        // console.log(name, errors, !_.isArray(errors))
        if( !_.isArray(errors) ) return errors

        let err:any= false
        _.some(errors, (item, index) => {
            if( typeof item != 'object' ) {
            // if( typeof item != 'object' ) {
                err= errors
                return true;
            }
            if( !_.isNull(item?.value) ) {
                err= item?.value
                return true;
            }

            err= item?.value
        });
        return err
    }
    let errors= $derived(vaild( _.get(err, name) ))
    // let errors= $derived(_.get(err, name))
    // $inspect(name, errors, 'errrrrrrrrr', vaild(errors), _.isEmpty(errors))
</script>

<fieldset 
    class={cn("border border-gray-600 p-2 rounded-", className,{
        'border-red-600' : errors,
        // 'border-red-600' : error != null ? error : err?.[name],
    })}
>
    <legend class="text-xs ml-2 px-3">
        {label}
        {#if required }
            <span class="text-red-600">(필수)</span>
        {/if}
    </legend>
    <!-- <Component name={restProps.name} /> -->
    {@render children?.()}
    <!-- {#if error || err?.[name]} -->
    {#if errors}
        <p class="text-xs text-red-800 font- mt-1">
            <!-- {console.log(err)} -->
            <!-- {@html err.join('<br>') } -->
            <!-- {@html error != null ? error : err[name] } -->
            {@html errors }
        </p>
    {/if}
    
</fieldset>