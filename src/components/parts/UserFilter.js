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
  Text,
  Thumbnail,
  Right,
  Container
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    console.log("hoge");
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

  _fetch = () => {};

  render() {
    return (
      <Container style={styles.container}>
        <List>
          <FlatList
            data={this.dummylist}
            renderItem={({ item }) => (
              <ListItem avatar>
                <Left>
                  <Thumbnail small source={{ url: item.avatarSource }} />
                </Left>
                <Body>
                  <Text>{item.userId}</Text>
                </Body>
                <Right>
                  <Icon name="check" size={25} />
                </Right>
              </ListItem>
            )}
          />
        </List>
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
