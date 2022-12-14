import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formWrapper: {
    position: "relative",
    paddingTop: 92,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  userImage: {
    position: "absolute",
    alignSelf: "center",
    top: -60,
    flex: 1,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addBtn: {
    position: "absolute",
    right: -13,
    bottom: 13,
  },
  add: {
    width: 25,
    height: 25,
  },

  headline: {
    marginBottom: 33,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  innerFormWrapper: {},
  input: {
    height: 50,
    marginBottom: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  passBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  passBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  button: {
    marginTop: 43,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  link: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
