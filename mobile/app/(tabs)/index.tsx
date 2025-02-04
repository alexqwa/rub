import clsx from "clsx"
import { router } from "expo-router"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native"
import NetInfo from "@react-native-community/netinfo"

import { Header } from "@/src/components/Header"

export default function Authentication() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
    })

    return unsubscribe()
  }, [])

  return (
    <View className="bg-background flex-1 items-center">
      <Header title="Autenticação" back={false} />
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          className="flex-1 w-full"
        >
          <View className="flex-1 items-center w-full max-w-[90%]">
            <Text className="text-white font-rajdhani_700 text-4xl mb-2">
              RUB <Text className="text-green-500">UNLOCKED</Text>
            </Text>
            <Text className="text-white text-center font-rajdhani_700 text-base">
              Faça as mudanças necessárias para que o seu{"\n"}departamento
              fique sempre no verde!
            </Text>

            <View className="space-y-3 w-full mt-10">
              <View className="relative w-full bg-foreground justify-center rounded-lg px-4 h-13 border border-outline">
                <Text className="text-[#8D8D99] font-rajdhani_700">
                  http://10.12.223.223:4280
                </Text>
                <View
                  className={clsx("rounded-full h-2 w-2 absolute right-4", {
                    ["bg-yellow-500"]: isConnected === null,
                    ["bg-green-500"]: isConnected === true,
                    ["bg-red-500"]: isConnected === false,
                  })}
                />
              </View>
              <TextInput
                selectionColor="#F7DD43"
                placeholderTextColor="#8D8D99"
                placeholder="DIGITE SEU CPF"
                keyboardType="number-pad"
                className="w-full bg-foreground text-yelp font-rajdhani_700 rounded-lg px-4 h-13 border border-outline"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.replace("/(home)")}
                className="bg-[#F7DD43] items-center justify-center w-full h-13 rounded-lg"
              >
                <Text className="uppercase text-black text-base font-rajdhani_700">
                  Conectar-se ao servidor
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
