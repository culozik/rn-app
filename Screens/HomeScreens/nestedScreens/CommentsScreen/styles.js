import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postImage: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
    borderRadius: 8,
  },
  postsContainer: { flex: 1, marginHorizontal: 16 },
  comment: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: 24,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  inputWrapper: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    paddingTop: 16,
    paddingRight: 58,
    paddingBottom: 15,
    paddingLeft: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },

  btn: {
    position: "absolute",
    right: 14,
    bottom: 14,
    transform: [{ translateX: -5 }],
    transform: [{ translateY: 9 }],
    justifyContent: "center",
    alignItems: "center",
  },
});
