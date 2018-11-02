import React, { Component } from "react";
import { AsyncStorage, Button, StyleSheet, View } from "react-native";

export default class UserScreen extends Component {
  onPushSignout() {
    AsyncStorage.removeItem("@IvyWest:token");
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.onPushSignout()}
          title="Sign out"
          color="#841584"
        />
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
  sample: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
