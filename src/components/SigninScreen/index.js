import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
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
      mode: "signin", // or signup
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
        <Content>
          <Form>
            <Item>
              <Label>Username</Label>
              <Input
                onChageText={text => this.setState({ userId: text })}
                value={this.state.userId}
              />
            </Item>
            <Item>
              <Label>Password</Label>
              <Input
                onChageText={text => this.setState({ pass: text })}
                value={this.state.pass}
              />
            </Item>
          </Form>
          <Button block>
            <Text>Sign in</Text>
          </Button>
          <Text>{this.state.userId}</Text>
          <Text>{this.state.pass}</Text>
        </Content>
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
