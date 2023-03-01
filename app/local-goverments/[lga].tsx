import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link, Stack, useSearchParams } from "expo-router";
import useFetch from "../../hooks/useFetch";

export default function state() {
  const { lga } = useSearchParams();
  const { data } = useFetch("https://obidatti.site/api/wards?lga=" + lga);

  return (
    <View style={{ backgroundColor: "black", paddingBottom: 50 }}>
      <Stack.Screen options={{ title: `${data?.name ?? ""} LGA` }} />
      {data?.data?.map((ward: any) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 15,
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginTop: 10,
            borderRadius: 10,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#454545",
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }} key={ward.ward}>
            {ward.ward}
          </Text>

          <Link href={`/wards/${ward.ward}`} asChild>
            <Pressable>
              {({ hovered, pressed }) => (
                <Text
                  style={{ color: "white", fontSize: 16, marginLeft: "auto" }}
                >
                  View
                </Text>
              )}
            </Pressable>
          </Link>
        </View>
      ))}
    </View>
  );
}
