import React, { Component } from "react";
import {
  Image,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import {
  Body,
  Left,
  List,
  ListItem,
  Thumbnail,
  Right,
  Container,
  Footer,
  Button,
  Text,
  Content
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

export default class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: [],
      update: 0
    };
  }

  componentDidMount() {
    this._fetch();
    this.getFilterUsers();
  }

  dummylist = [
    {
      userId: "agatsuma",
      avatarSource:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/George-W-Bush.jpeg/245px-George-W-Bush.jpeg"
    },
    {
      userId: "ivy",
      avatarSource:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/250px-President_Barack_Obama.jpg"
    },
    {
      userId: "hoge",
      avatarSource:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/250px-Donald_Trump_official_portrait.jpg"
    }
  ];

  //AsyncStorageにフィルタ対象のユーザー一覧を保存
  setFilterUsers = async users => {
    const filterUsers = JSON.stringify(users);
    console.log(filterUsers);
    try {
      await AsyncStorage.setItem("filterUsers", filterUsers);
    } catch (error) {
      console.error();
    }
  };

  //AsyncStorageからフィルタ済みユーザーを読み込む
  getFilterUsers = async () => {
    try {
      const filterUsers = await AsyncStorage.getItem("filterUsers");
      if (filterUsers !== null) {
        this.state.selectedUsers = JSON.parse(filterUsers);
        this.state.users.map(user => [
          this.state.selectedUsers.map(suser => {
            if (user.userId === suser.userId) {
              user.check = true; //フィルタ済みユーザーのチェックを更新
            }
          })
        ]);
      }
    } catch (error) {
      console.error();
    }
  };

  onPressSubmitButton = () => {
    this.setFilterUsers(this.state.selectedUsers);
    Actions.pop();
  };

  _fetch = () => {
    this.dummylist.map(item => {
      item.check = false;
    });
    this.setState({ users: this.dummylist });
  };

  onPressItem = item => {
    const tmp = this.state.users;
    tmp.map(user => {
      if (user.userId == item.userId) {
        user.check = !user.check;
        if (user.check) {
          this.state.selectedUsers.push(user);
        } else {
          const i = this.state.selectedUsers.indexOf(user);
          this.state.selectedUsers.splice(i, 1);
        }
      }
    });
    this.setState({ users: tmp, update: this.state.update + 1 });
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1 }}>
          <List>
            <FlatList
              data={this.state.users}
              keyExtractor={item => item.userId}
              extraData={this.state.update}
              renderItem={({ item }) => (
                <ListItem avatar onPress={() => this.onPressItem(item)}>
                  <Left>
                    <Thumbnail small source={{ url: item.avatarSource }} />
                  </Left>
                  <Body>
                    {item.check ? (
                      <Text style={{ fontWeight: "bold" }}>{item.userId}</Text>
                    ) : (
                      <Text>{item.userId}</Text>
                    )}
                  </Body>
                  <Right>
                    {item.check ? (
                      <Icon name="check" size={20} color="#00BFFF" />
                    ) : (
                      <Icon name="check" size={20} color="#D8D8D8" />
                    )}
                  </Right>
                </ListItem>
              )}
            />
          </List>
        </View>
        <Footer>
          <Content>
            <Button full info onPress={() => this.onPressSubmitButton()}>
              <Text>検索</Text>
            </Button>
          </Content>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});