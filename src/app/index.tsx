import { useState, useRef } from "react"
import { FlatList, View, SectionList, Text } from "react-native"

import {CATEGORIES, MENU, ProductProps} from '@/utils/data/products'

import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { Link } from "expo-router"
import { useCartStore } from "@/stores/cart-stores"

export default function Home (){
    const cartStore = useCartStore()
    const [categorySelected, setCategorySelected] = useState(CATEGORIES[0])

    //pegando a referencia da SectionList
    const sectionListRef = useRef<SectionList<ProductProps>>(null)
    function ChangeCategorySelected (selectedCategory:string){
        setCategorySelected(selectedCategory)

        //capturando index do item atual
        const sectionIndex = CATEGORIES.findIndex( (category) => category === selectedCategory)
        
        if (sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }

    //pegando a quantitdade de produtos no carrinho
    const cartQuantity = cartStore.products.reduce((total, product) =>  total + product.quantity, 0)
    return (
        <View className="flex-1">
            <Header title = "faça seu pedido" cartQuantity={cartQuantity}/>

            <FlatList 
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <CategoryButton 
                        title={item}
                        onPress={() =>  ChangeCategorySelected(item)}
                        isSelected = {item === categorySelected}
                    />
                )}
                horizontal
                className="max-h-10 mt-5"
                contentContainerStyle = {{gap: 12, paddingHorizontal:20}}
                showsHorizontalScrollIndicator = {false}

            />

            <SectionList
                ref = {sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled = {false}
                renderItem={({item}) => (
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data = {item} />
                    </Link>
                )}
                renderSectionHeader={ ({section: {title} }) => (
                    <Text className="text-xl text-white font-heading mt-8 mb-3"> {title} </Text>
                )}
                className="flex-1 p-5"
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{paddingBottom: 100}}
            />
        </View>
    )
}