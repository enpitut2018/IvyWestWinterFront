import React, { Component } from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { Actions } from "react-native-router-flux";

export default class UserScreen extends Component {
  onPushSignout() {
    AsyncStorage.removeItem("@IvyWest:token").then(() => {
      Actions.reset("auth");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          block
          warning
          style={styles.button}
          onPress={() => this.onPushSignout()}
        >
          <Text>Sign out</Text>
        </Button>
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
  button: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 30
  }
});
