import { Text, TouchableOpacity } from "react-native";

const MyButton = ({
  mainStyle,
  opacity,
  func,
  textStyle,
  text,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={mainStyle}
      activeOpacity={opacity}
      onPress={func}
      disabled={disabled}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;
