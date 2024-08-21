import { StyleSheet, View } from "react-native";

import DefaultBackButton from "./DefaultBackButton";

export default function NavigationBar({ hideDefaultBackButton, children }) {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {!hideDefaultBackButton ? <DefaultBackButton /> : null}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column-reverse",
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
});
