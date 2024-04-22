import React from "react"
import { TextInput } from "react-native-paper"


export const LongInput = (props : any) => {
return (
<TextInput 
    style={{width:"100%", backgroundColor: "white"}}
    theme={{roundness: 10}}
    underlineColorAndroid="transparent"
    mode='outlined'
    label={props.label}
    activeOutlineColor='black'
    keyboardType={props.keyboard}
    onChangeText={props.onChange}
    defaultValue={props.value}
    right={<TextInput.Affix text={props.affix}/>}
/>
)
}

export const ShortInput = (props : any) => {
    return (
    <TextInput 
        style={{width:"30%", backgroundColor: "white"}}
        theme={{roundness: 10}}
        underlineColorAndroid="transparent"
        mode='outlined'
        label={props.label}
        activeOutlineColor='black'
        keyboardType={props.keyboard}
        onChangeText={props.onChangeText}
        defaultValue={props.value}
        right={<TextInput.Affix text={props.affix}/>}
    />
    )
    }
