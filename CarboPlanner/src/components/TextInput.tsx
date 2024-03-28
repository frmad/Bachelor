import { TextInput } from "react-native-paper"


export const LongTextInput = (props : any) => {
return (
<TextInput 
    style={{width:"100%", backgroundColor: "white"}}
    theme={{roundness: 10}}
    underlineColorAndroid="transparent"
    mode='outlined'
    label={props.label}
    activeOutlineColor='black'
    onChangeText={props.onChange}
    right={<TextInput.Affix text={props.affix}/>}
/>
)
}

export const ShortTextInput = (props : any) => {
    return (
    <TextInput 
        style={{width:"30%", backgroundColor: "white"}}
        theme={{roundness: 10}}
        underlineColorAndroid="transparent"
        mode='outlined'
        label={props.label}
        activeOutlineColor='black'
        onChangeText={props.onChangeText}
        right={<TextInput.Affix text={props.affix}/>}
    />
    )
    }
