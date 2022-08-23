import { Text, TouchableOpacity } from "react-native";

const MyButton = ({ mainStyle, opacity, func, textStyle, text }) => {
  return (
    <TouchableOpacity style={mainStyle} activeOpacity={opacity} onPress={func}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;
