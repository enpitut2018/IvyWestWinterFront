import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class UploadPhotosScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sampel}>UploadPhotosScreen</Text>
      </View>
    );
  }
}

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
