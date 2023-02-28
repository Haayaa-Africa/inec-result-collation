import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import useFetch from '../hooks/useFetch';

export default function index() {
    const { data, } = useFetch('http://inec.test/api/states')
    return (
        <View style={{ backgroundColor: "black", paddingBottom: 50 }}>
            <Stack.Screen options={{ title: 'States' }} />
            {
                data?.data.map((state: any) => (
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 15, paddingVertical: 10, paddingHorizontal: 10, marginTop: 10, borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: "#454545"
                    }}>
                        <Text style={{ color: "white", fontSize: 24 }} key={state.state}>{state.state}</Text>


                        <Link href={`/states/${state.state}`} asChild >
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