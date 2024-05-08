import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { useTheme } from "@react-navigation/native";

export default function NoInternet() {
  const [isConnected, setIsConnected] = React.useState(true);
  const { colors } = useTheme();
  const isIOS = Platform.OS === "ios";

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isConnected ? (
        <></>
      ) : (
        <SafeAreaView style={{ justifyContent: "center", alignItems: "center", marginTop: isIOS ? 0 : 20, backgroundColor: colors.modalBackground, borderRadius: 10, padding: 10 }}>
          <Text style={{ color: colors.text }}>No connection...</Text>
        </SafeAreaView>
      )}
    </>
  );
}
