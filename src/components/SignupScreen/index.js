import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Text
} from "native-base";
import { signup } from "../../models/auth";
import { Actions } from "react-native-router-flux";

export default class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      pass: ""
    };
  }

  onPushSubmit() {
    try {
      signup(this.state.userId, this.state.pass);
      // TODO APIからTokenが返って来たら保存してtabに遷移させる
      Actions.reset("auth");
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item>
              <Input
                onChangeText={text => this.setState({ userId: text })}
                value={this.state.userId}
                placeholder="ユーザID"
                autoCapitalize="none"
              />
            </Item>
            <Item last>
              <Input
                onChangeText={text => this.setState({ pass: text })}
                value={this.state.pass}
                placeholder="パスワード"
                autoCapitalize="none"
              />
            </Item>
            <Button
              block
              style={styles.button}
              onPress={() => this.onPushSubmit()}
            >
              <Text>サインアップ</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  button: {
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20
  }
});
