import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack, useSearchParams } from 'expo-router'
import useFetch from '../../hooks/useFetch';

export default function state() {

    const { ward } = useSearchParams();
    const { data, } = useFetch('http://inec.test/api/pus?ward=' + ward)

    return (
        <View style={{ backgroundColor: "black", paddingBottom: 50 }}>
            <Stack.Screen options={{ title: `${data?.name ?? ""} Ward` }} />
            {
                data?.data?.map((pu: any) => (
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 15, paddingVertical: 10, paddingHorizontal: 10, marginTop: 10, borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: "#454545"
                    }}>
                        <View style={{ flex: 1, marginRight: 20 }}>
                            <Text style={{ color: "white", fontSize: 24, marginBottom: 10 }} >{pu.pu}</Text>
                            <Text style={{ color: "#ddd", fontSize: 18, }} >Number: {pu.delim}</Text>
                        </View>

                        <Link href={`/polling-unit/${pu.delim}`} asChild >
                            <Pressable>
                                {({ hovered, pressed }) => (
                                    <Text style={{ color: "white", fontSize: 16, marginLeft: "auto" }}>View</Text>
                                )}
                            </Pressable>
                        </Link>
                    </View>
                ))
            }
        </View>
    )
}