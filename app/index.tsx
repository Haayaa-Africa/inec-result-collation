import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import useFetch from "../hooks/useFetch";

import { Text } from "@ui-kitten/components";

export default function index() {
  const { data } = useFetch("https://obidatti.site/api/states");
  return (
    <View style={{ backgroundColor: "black", paddingBottom: 50 }}>
      <Stack.Screen options={{ title: "Result Collation" }} />
      {data?.data.map((state: any, index: number) => (
        <View
          key={index}
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
          <Text
            category="c1"
            style={{ color: "white", fontSize: 24 }}
            key={state.state}
          >
            {state.state}
          </Text>

          <Link href={`/states/${state.state}`} asChild>
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
