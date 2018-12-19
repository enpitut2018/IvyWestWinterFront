import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Thumbnail } from "native-base";

const UserInfo = ({ avatarURL, userID }) => {
  return (
    <View style={styles.userInfo}>
      <Thumbnail style={styles.userAvatar} small source={{ uri: avatarURL }} />
      <Text style={styles.userID}>{userID}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  userAvatar: {
    marginRight: 10,
    marginLeft: 10
  },
  userID: {
    fontSize: 15
  }
});

export default UserInfo;
