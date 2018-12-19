import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "native-base";

const PeopleAvatarArea = ({ photoID, people }) => {
  return (
    <View>
      <Text style={styles.text}>写っている人</Text>
      <View style={styles.peopleAvatarArea}>
        {[...Array(15)].map((_, i) => {
          return (
            <Image
              key={`${photoID}-${i}`}
              style={styles.peopleAvatar}
              source={{
                uri:
                  "http://img3.goipadwallpapers.com/2013/12/06/cc20664ab8879c36_2048x2048.jpg"
              }}
              // TODO サンプル画像差し替え
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "white",
    color: "#333",
    paddingTop: 10,
    paddingLeft: 10
  },
  peopleAvatarArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10
  },
  peopleAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 10
  }
});

export default PeopleAvatarArea;
