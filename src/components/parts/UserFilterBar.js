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

const { window } = Dimensions.get("window");

const UserFilterBar = ({ userid, avatar, users }) => {
  var otherAvatarList = [];
  // propsで渡されたフィルタ対象のアイコンを読み込む
  if (users !== null) {
    users.map(user => {
      otherAvatarList.push(
        <TouchableOpacity
          onPress={() => Actions.UserFilterScreen({ userid: userid })}
        >
          <Image
            source={{ uri: user.avatarurl }}
            style={styles.otherUserAvatar}
          />
        </TouchableOpacity>
      );
    });
  }
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.userAvatar} />
      <ScrollView
        horizontal={true}
        scrollEnabled={true}
        style={styles.otherUsersArea}
      >
        {otherAvatarList}
        <TouchableOpacity
          onPress={() => Actions.UserFilterScreen({ userid: userid })}
        >
          <Image source={AddUserIcon} style={styles.addUserIcon} />
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
    backgroundColor: "#FFF",
    borderRadius: 13
  },
  otherUsersArea: {}
});

export default UserFilterBar;
