import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";

class CameraScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sampel}>CameraScreen</Text>
      </View>
    );
  }
}
CameraScreen.navigationOptions = {
  title: "カメラ"
};

export default createStackNavigator(
  {
    Camera: { screen: CameraScreen }
  },
  {
    initialRouteName: "Camera"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  sampel: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
