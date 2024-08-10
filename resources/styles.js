import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rootLayout: {
    backgroundColor: "gray",
    height: "100%",
    width: "100%",
    borderWidth: 3,
    borderColor: "red",
  },
  screenContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    padding: "1%",
  },
  singinInput: {
    marginBottom: "2%",
    backgroundColor: "white",
    borderRadius: 3,
    width: "100%",
    height: "5%",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: "1%",
    width: "100%",
  },
  messagesList: {
    width: "100%",
  },
  messageCard: {
    padding: "1%",
    marginBottom: "1%",
    borderRadius: 3,
    backgroundColor: "#f39c12",
  },
});
