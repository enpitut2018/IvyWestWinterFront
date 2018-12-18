import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const UserInfo = ({ avatarURL, userID }) => {
  return (
    <View style={styles.userInfo}>
      <Image
        style={styles.userAvatar}
        source={{
          uri: avatarURL
        }}
      />
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
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10
  },
  userID: {
    fontSize: 15
  }
});

export default UserInfo;
