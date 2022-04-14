import React, { useState, useEffect } from "react";
import { Animated, View } from "react-native";

export default ProgressBar = (props) => {
  const [value] = useState(new Animated.Value(props.value));

  useEffect(() => {
    Animated.timing(value, {
      toValue: props.value,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [props.value]);

  const width = value.interpolate({
    inputRange: [0, props.maxValue],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={{
        width: "90%",
        height: "2%",
        flexDirection: "row",
        backgroundColor: "white",
        alignSelf: "center",
        marginBottom: 30,
        borderRadius: 20,
      }}
    >
      <Animated.View
        style={{
          width: width,
          height: "100%",
          backgroundColor: "green",
        }}
      ></Animated.View>
    </View>
  );
};
