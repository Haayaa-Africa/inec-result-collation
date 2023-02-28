import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { Stack, useRouter, useSearchParams } from 'expo-router'
import useFetch from "../../hooks/useFetch";
import { useFilePicker } from "use-file-picker";

export default function state() {
    const { unit } = useSearchParams();
    const { data } = useFetch("/api/pu?pu=" + unit);

    const router = useRouter()

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: "DataURL",
        accept: "image/*",
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 10,
        imageSizeRestrictions: {
            maxHeight: 1600, // in pixels
            maxWidth: 1600,
        },
    });

    const uploadResults = async () => {
        const formData = new FormData();
        const file = await (await fetch(filesContent[0].content)).blob();
        formData.append("file", file);
        formData.append("pu", unit);

        const response = await fetch("/uploads", {
            method: "POST",
            body: formData,
        });
    };

    return (
        <View
            style={{
                backgroundColor: "black",
                paddingHorizontal: 15,
                // flex: 1,
                // marginBottom: 15,
            }}
        >
            <Stack.Screen options={{ title: `${data?.pu ?? ""} Polling Unit` }} />

            <View
                style={{
                    flex: 1,
                    marginTop: 15,
                }}
            >
                <Pressable
                    style={{
                        backgroundColor: "#e60019",
                        padding: 15,
                        borderRadius: 5,
                        borderWidth: 1,
                    }}
                    onPress={openFileSelector}
                >
                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
                        Upload Result
                    </Text>
                </Pressable>
            </View>

            {
                filesContent[0] && (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        <Image
                            source={{ uri: filesContent[0].content }}
                            style={{ width: 200, height: 200, borderRadius: 10 }}
                        />

                        <View style={{ height: 10 }} />

                        <Pressable
                            onPress={uploadResults}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 10,
                                backgroundColor: "#00923f",
                                borderRadius: 5,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 18 }}>Sumbit</Text>
                        </Pressable>
                    </View>
                )
            }

            <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
                    Upload History
                </Text>

                <View
                    style={{
                        paddingTop: 15,
                    }}
                >
                    <View style={{ width: "40%" }}>
                        <View style={{ height: 200, width: 200 }}>
                            <Image
                                style={{
                                    flex: 1,
                                    height: undefined,
                                    width: undefined,
                                }}
                                //   source={{ uri: filesContent[0].content }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View style={{}}>
                        <Text style={{ color: "#fff" }}>Date Added</Text>
                    </View>
                </View>
            </View>
        </View >
    );
}
