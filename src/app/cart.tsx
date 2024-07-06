import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-stores";
import { ProductProps } from "@/utils/data/products";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { Link } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Cart (){
    const cartStore = useCartStore()

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
                <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." />
            </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button>
                    <Button.Text> Enviar pedido</Button.Text>
                </Button>

                <Link href={"/"}> Voltar ao cardápio </Link>
            </View>
        </View>
    )
}