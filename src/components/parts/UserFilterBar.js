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
import InitialIcon from "../../assets/initial_icon.png";
import AddUserIcon from "../../assets/add_user_icon.png";

const { window } = Dimensions.get("window");

const UserFilterBar = ({ users }) => {
  var otherAvatarList = [];
  // propsで渡されたフィルタ対象のアイコンを読み込む
  if (users !== null) {
    users.map(user => {
      otherAvatarList.push(
        <Image source={{ uri: user.avatarSource }} style={styles.userAvatar} />
      );
    });
  }
  return (
    <View style={styles.container}>
      <Image source={InitialIcon} style={styles.userAvatar} />
      <TouchableOpacity onPress={() => Actions.UserFilterScreen()}>
        <ScrollView horizontal={true} style={styles.otherUsersArea}>
          {otherAvatarList}
          <Image source={AddUserIcon} style={styles.addUserIcon} />
        </ScrollView>
      </TouchableOpacity>
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
    height: 30,
    width: 30,
    margin: 10,
    backgroundColor: "#F5FCFF",
    borderRadius: 15
  },
  addUserIcon: {
    height: 26,
    width: 26,
    margin: 12,
    backgroundColor: "#FFF",
    borderRadius: 13
  },
  otherUsersArea: {
    width: window - 30
  }
});

export default UserFilterBar;
