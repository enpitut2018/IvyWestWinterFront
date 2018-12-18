import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

// 画面サイズを取得
const { width } = Dimensions.get("window");

class TimeLineCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { photo } = this.props;

    return (
      <View style={{ marginBottom: 10 }}>
        <View style={styles.userInfo}>
          <Image
            style={styles.userAvatar}
            source={{
              uri:
                "https:/s3-ap-northeast-1.amazonaws.com/ivy-west-winter/user-face-photos/bfn7ucj3spn4isqqr1bg.jpg"
            }}
            // TODO サンプル画像差し替え
          />
          <Text style={styles.userId}>{photo.userid}</Text>
        </View>
        <AutoHeightImage width={width} source={{ uri: photo.url }} />
      </View>
    );
  }
}

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
  userId: {
    fontSize: 15
  }
});

export default TimeLineCard;
