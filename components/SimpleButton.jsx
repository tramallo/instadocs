import { ActivityIndicator, Pressable, Text } from "react-native";

export default function SimpleButton({
  style,
  text,
  onPress,
  onClick,
  disabled,
  working,
}) {
  return (
    <Pressable
      style={style}
      onPress={onPress}
      onClick={onClick}
      disabled={disabled || working}
    >
      {working ? <ActivityIndicator /> : <Text>{text}</Text>}
    </Pressable>
  );
}
