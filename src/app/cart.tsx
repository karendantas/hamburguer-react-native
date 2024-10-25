import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-stores";
import { ProductProps } from "@/utils/data/products";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "5584998029780"

export default function Cart (){
    const [adress, setAdress] = useState("")
    const cartStore = useCartStore()
    const navigation  = useNavigation()

    const total = FormatCurrency(cartStore.products.reduce((total, product) => 
        total + product.price * product.quantity
    , 0))

    function handleProductRemove (product: ProductProps){
        Alert.alert("Remover", `Deseja remover ${product.title}?`, [
            {
                text : "Cancelar",
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            },
        ])
    }

    function handleOrder(){
        if (adress.trim().length === 0){
            return Alert.alert("Pedido", "Informe os dados da entrega")
        }
        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        const message = `
            NOVO PEDIDO
            \n Entregar em: ${adress}
            ${products}
            \n Total: ${total}
        `

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear()
        navigation.goBack()
    }
    return(
        <View className="flex-1 pt-8">
            <Header title = "seu carrinho"/>
            <KeyboardAwareScrollView>
            <ScrollView> 
            {
                cartStore.products.length > 0 ? (
                    <View className="p-5 flex-1">
         
                    {
                        cartStore.products.map((product) => (
                            <Product 
                                key = {product.id}
                                data = {product}
                                onPress={() => handleProductRemove(product)}
                            />
                        ))
                    }
            </View>
                ) : (
                    <Text className= "font-body text-slate-500 text-center my-8"> Seu carrinho está vazio </Text>
                )
            }
            
            <View className="flex-row gap-2 items-center mt-5 mb-4 px-4">
                <Text className="text-white text-xl font-subtitle">
                    Total:
                </Text>

                <Text className="text-lime-400 text-2xl font-heading"> {total}</Text>

            </View>
                <Input
                    onChangeText={setAdress} 
                    onSubmitEditing={handleOrder}
                    blurOnSubmit = {true}
                    placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." />
            </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text> Enviar pedido</Button.Text>
                </Button>

                <Link href={"/"}> Voltar ao cardápio </Link>
            </View>
        </View>
    )
}