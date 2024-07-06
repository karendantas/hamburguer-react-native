import "@/styles/global.css"

import { Slot } from 'expo-router'
import { SafeAreaView, View } from "react-native"
import {useFonts, 
        Inter_400Regular, 
        Inter_500Medium, 
        Inter_600SemiBold, 
        Inter_700Bold} from '@expo-google-fonts/inter'
        
import { Loading } from "@/components/loading"

export default function Layout (){
    const [fontsLoaded] = useFonts({
        Inter_400Regular, 
        Inter_500Medium, 
        Inter_600SemiBold, 
        Inter_700Bold
    })
    return (
        <SafeAreaView className="bg-slate-900 flex-1">
           { fontsLoaded ?  <Slot /> : <Loading /> }
        </SafeAreaView>
    )
}