import { Image, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router"

import { PRODUCTS } from "@/utils/data/products";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
export default function Product(){

    const {id} = useLocalSearchParams()
    
    //pegando o produto atual
    const product = PRODUCTS.filter((product) => product.id === id)[0]
    console.log(product)
    return (
        <View className="flex-1">
            <Image source = {product.cover} className="w-full h-52" resizeMode="cover"/> 
            <View className="p-5 mt-8 flex-1">
                <Text className="text-lime-400 text-2xl font-heading my-2"> { FormatCurrency( product.price)} </Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6" > {product.description} </Text>

                {
                    product.ingredients.map((ingredient) => (
                        <Text
                            key = {ingredient} 
                             className="text-slate-400 text-base font-body leading-6"> 
                             {"\u2022"} {ingredient}</Text>
                    ))
                }
            </View>

            <View className="p-5 pb-8 gap-5">
                <Button>
                    <Button.Text> Adicinar ao carrinho </Button.Text>
                </Button>

                <Link href={"/"} className="text-slate-300 text-center font-heading"> Voltar ao cardápio </Link>
            </View>
        </View>
    )
}