import { ReactNode } from "react"
import { Pressable, PressableProps, Text } from "react-native"

type ButtonProps = PressableProps & {
    children: ReactNode
}

type ButtonTextProps  = {
    children : ReactNode
}
function Button ({children, ...rest}: ButtonProps){
    return (
        <Pressable className="h-12 bg-lime-400 roundend-md items-center justify-center flex-row" {...rest}>
            {children}
        </Pressable>
    )
}

function ButtonText ({children}: ButtonTextProps){
    return (
        <Text className="text-black font-heading text-base mx-2">
            {children}
        </Text>
    )
}

//injetando dentro do Button, uma nova propriedade 'Text' que sera o componente ButtonText
Button.Text = ButtonText
export {Button}