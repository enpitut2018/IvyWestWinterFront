import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

const { width } = Dimensions.get("window");

class PhotoDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { photo } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.userAvatar}
            source={{
              uri:
                "https:/s3-ap-northeast-1.amazonaws.com/ivy-west-winter/user-face-photos/bfn7ucj3spn4isqqr1bg.jpg"
            }}
            // TODO サンプル画像差し替え
          />
          <Text style={styles.userId}>guri3</Text>
          {/* TODO サンプルユーザ名差し替え */}
        </View>
        {/* TODO 以下、サーバサイドの表記揺れのため暫定的に三項演算子で処理 */}
        <AutoHeightImage
          width={width}
          source={{ uri: photo.Url ? photo.Url : photo.PhotoUrl }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5FCFF"
  },
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

export default PhotoDetailScreen;
