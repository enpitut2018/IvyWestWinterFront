import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";

class UploadPhotosScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sampel}>UploadPhotosScreen</Text>
      </View>
    );
  }
}
UploadPhotosScreen.navigationOptions = {
  title: "アップロード"
};

export default createStackNavigator(
  {
    UploadPhotos: { screen: UploadPhotosScreen }
  },
  {
    initialRouteName: "UploadPhotos"
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
