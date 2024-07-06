import { Image, Pressable, Text, View } from "react-native";
import {Feather} from "@expo/vector-icons"
import colors from "tailwindcss/colors";

type Props = {
    title: string
    cartQuantity?: number
}
export function Header ({title, cartQuantity=0}:Props){
    
    return (
        <View className="mt-9 flex-row items-center border-b border-slate-700 pb-5 mx-5">
            <View className="flex-1">
                <Image 
                    className="h-6 w-32"
                    source={require("@/assets/logo.png")} />
                    <Text className="text-white text-xl font-heading mt-2"> {title} </Text>
            </View>

            {
                cartQuantity > 0 && (
                <Pressable className="relative">
                    <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center absolute top-0 z-10 -right-1.5">
                        <Text className="text-slate-900 text-xs font-bold"> {cartQuantity} </Text>
                    </View>
                    <Feather name = "shopping-bag" color = { colors.white } size={24}/>
                </Pressable>
                )
            }
        </View>
    )
}