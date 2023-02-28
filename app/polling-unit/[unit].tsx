import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { Link, Stack, useRouter, useSearchParams } from 'expo-router'
import useFetch from '../../hooks/useFetch';
import { useFilePicker } from 'use-file-picker';

export default function state() {

    const { unit } = useSearchParams();
    const { data, } = useFetch('/api/pu?pu=' + unit)
    const router = useRouter()

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
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
        formData.append('file', file);
        formData.append('pu', unit);

        await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        router.replace('/polling-unit/' + unit)
    }

    return (
        <View style={{ backgroundColor: "black", paddingBottom: 50 }}>
            <Stack.Screen options={{ title: `${data?.pu ?? ""} Polling Unit` }} />

            <Pressable onPress={openFileSelector} style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Text style={{ color: "white", fontSize: 24 }}>Upload Result</Text>
            </Pressable>

            {
                filesContent[0] && (
                    <View>
                        <Image source={{ uri: filesContent[0].content }} style={{ width: 200, height: 200 }} />
                        <Pressable onPress={uploadResults} style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Text style={{ color: "white", fontSize: 24 }}>Upload</Text>
                        </Pressable>

                    </View>)
            }
        </View>
    )
}