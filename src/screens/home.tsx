import { Header } from "@/components/header"
import { FlatList, View } from "react-native"

import {CATEGORIES} from '@/utils/data/products'
import { CategoryButton } from "@/components/category-button"
import { useState } from "react"

export default function Home (){
    const [categorySelected, setCategorySelected] = useState(CATEGORIES[0])

    function ChangeCategorySelected (selectedCategory:string){
        setCategorySelected(selectedCategory)
    }
    return (
        <View className="flex-1">
            <Header title = "faça seu pedido"/>

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
        </View>
    )
}