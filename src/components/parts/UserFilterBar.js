import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import { List, ListItem, Thumbnail } from "native-base";
import { Actions } from "react-native-router-flux";
import AddUserIcon from "../../assets/add_user_icon.png";

//componetで実装してstateをもたせるべきだったかも
const UserFilterBar = ({ userid, avatar, users }) => {
  let hasUserId = false; //自分のIDを読み込んだ後にフィルタ画面に遷移できるようにするための変数
  let otherAvatarList = [];
  // propsで渡されたフィルタ対象のアイコンを読み込む
  if (users !== null && userid !== null) {
    hasUserId = true;
    users.map(user => {
      otherAvatarList.push(
        <TouchableOpacity
          onPress={() => Actions.UserFilterScreen({ userid: userid })}
          key={user.userid}
        >
          <Image
            source={{ uri: user.avatarurl }}
            style={{
              height: 30,
              width: 30,
              margin: 10,
              marginHorizontal: 5,
              backgroundColor: "#F5FCFF",
              borderRadius: 15,
              display: hasUserId ? "flex" : "none"
            }}
          />
        </TouchableOpacity>
      );
    });
  }
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.userAvatar} />
      <ScrollView horizontal={true} scrollEnabled={true}>
        {otherAvatarList}
        <TouchableOpacity
          onPress={() => Actions.UserFilterScreen({ userid: userid })}
          key="check"
        >
          <Image
            source={AddUserIcon}
            style={{
              height: 26,
              width: 26,
              margin: 12,
              marginHorizontal: 5,
              backgroundColor: "#FFF",
              display: hasUserId ? "flex" : "none"
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    height: 50
  },
  filterSearchBar: {
    margin: 10,
    width: 300,
    backgroundColor: "#EEE",
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 30
  },
  userAvatar: {
    height: 40,
    width: 40,
    margin: 5,
    marginLeft: 15,
    marginRight: 10,
    backgroundColor: "#F5FCFF",
    borderRadius: 20
  },
  otherUserAvatar: {
    height: 30,
    width: 30,
    margin: 10,
    marginHorizontal: 5,
    backgroundColor: "#F5FCFF",
    borderRadius: 15
  },
  addUserIcon: {
    height: 26,
    width: 26,
    margin: 12,
    marginHorizontal: 5,
    backgroundColor: "#FFF"
  }
});

export default UserFilterBar;
