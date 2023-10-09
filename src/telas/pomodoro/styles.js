import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#f9f9f9",
    backgroundColor: "#44475c",
  },

  clock: {
    height: 230,
    marginTop: 110,
    paddingHorizontal: 80,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    borderRadius: 24,
    
    // IOS
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10,  },
    shadowOpacity: 0.8,

    // Android
    elevation: 10
  },

  buttonGroup: {
    flexDirection: "row",
  },
});

export default styles;
