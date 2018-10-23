import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body,
  Title
} from "native-base";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "signin", // signin or signup
      userId: "",
      pass: ""
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>サインイン</Title>
          </Body>
        </Header>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ userId: text })}
          value={this.state.text}
          placeholder="ユーザーID"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ pass: text })}
          value={this.state.text}
          placeholder="パスワード"
        />
        <Button block>
          <Text>Sign in</Text>
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
  sampel: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
