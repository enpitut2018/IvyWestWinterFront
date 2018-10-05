import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";

class DownloadPhotosScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sampel}>DownloadPhotosScreen</Text>
      </View>
    );
  }
}
DownloadPhotosScreen.navigationOptions = {
  title: "ダウンロード"
};

export default createStackNavigator(
  {
    DownloadPhotos: { screen: DownloadPhotosScreen }
  },
  {
    initialRouteName: "DownloadPhotos"
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
