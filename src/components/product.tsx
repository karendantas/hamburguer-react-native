import { forwardRef } from "react";
import { Pressable, PressableProps, Image, ImageProps, View, Text } from "react-native";

type ProductDataProps = {
    title: string
    description: string
    thumbnail: ImageProps
    quantity?: number
}
type ProductProps = PressableProps &{
    data: ProductDataProps
}
export const Product = forwardRef<PressableProps, ProductProps>(({data, ...rest}, ref) => {
    return(
        <Pressable className="w-full flex-row items-center pb-4" {...rest} ref = {ref}>
            <Image source = {data.thumbnail} className="w-20 h-20 rounder-md"/>

            <View className="flex-1 ml-3">
                <View className="flex-row items-center "> 
                    <Text className="text-slate-100 font-subtitle text-base flex-1"> {data.title} </Text>
                    { data.quantity && 
                        <Text className="text-slate-400 font-subtitle text-sm">
                            x {data.quantity}
                        </Text>
                    }
                </View>
            <Text className="text-slate-400 text-xs leading-5 mt-0.5"> {data.description} </Text>

            </View>
        </Pressable>
    )
})
