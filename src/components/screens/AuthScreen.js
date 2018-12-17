import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Container, Text } from "native-base";
import { Actions } from "react-native-router-flux";

export default class AuthScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Button block style={styles.button} onPress={() => Actions.signin()}>
          <Text>サインイン</Text>
        </Button>
        <Button
          block
          info
          style={styles.button}
          onPress={() => Actions.signup()}
        >
          <Text>サインアップ</Text>
        </Button>
      </Container>
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
