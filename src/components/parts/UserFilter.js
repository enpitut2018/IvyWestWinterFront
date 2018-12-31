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
      update: 0 //FlatList更新用の変数, これが変化しないとFlatListが更新されない
    };
  }

  componentDidMount() {
    this._fetch();
    this.loadFilterUsers();
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
  saveFilterUsers = async users => {
    const filterUsers = JSON.stringify(users);
    try {
      await AsyncStorage.setItem("filterUsers", filterUsers);
    } catch (error) {
      console.error();
    }
  };

  //AsyncStorageからフィルタ済みユーザーを読み込む
  loadFilterUsers = async () => {
    try {
      const filterUsers = await AsyncStorage.getItem("filterUsers");
      if (filterUsers !== null) {
        this.state.selectedUsers = JSON.parse(filterUsers);
        console.log(this.state.selectedUsers);
        const users = this.state.users;
        users.map(user => {
          this.state.selectedUsers.map(suser => {
            if (user.userId === suser.userId) {
              user.check = true; //フィルタ済みユーザーのチェックを更新
            }
          });
        });
        console.log(users);
        this.setState({ users: users });
      }
    } catch (error) {
      console.error();
    }
  };

  onPressSubmitButton = () => {
    this.saveFilterUsers(this.state.selectedUsers);
    Actions.pop();
  };

  //ユーザー一覧の読み込み
  _fetch = () => {
    const userList = this.dummylist; //TODO: WebAPIから読み込むようにする
    userList.map(user => {
      user.check = false; //チェック状態を初期化
    });
    this.setState({ users: userList });
  };

  onPressItem = item => {
    const users = this.state.users;
    users.map(user => {
      console.log(user.userId);
      console.log(user.check);
      if (user.userId == item.userId) {
        user.check = !user.check;
        if (user.check) {
          this.state.selectedUsers.push(user); //選択済みユーザーを追加
        } else {
          const i = this.state.selectedUsers.findIndex(
            //選択済みユーザー一覧から探索
            ({ userId }) => userId === user.userId
          );
          console.log(i);
          if (i != -1) {
            this.state.selectedUsers.splice(i, 1); //選択済みユーザーの一覧から消去
          }
        }
      }
    });
    console.log(this.state.selectedUsers);
    this.setState({ users: users, update: this.state.update + 1 });
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
                      <Text style={{ fontWeight: "bold" }}>{item.userId}</Text> //チェック済みの場合ユーザーIDを太字
                    ) : (
                      <Text>{item.userId}</Text>
                    )}
                  </Body>
                  <Right>
                    {item.check ? (
                      <Icon name="check" size={20} color="#00BFFF" /> //チェック済みの場合チェックアイコンに色付け
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
