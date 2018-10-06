import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

class DownloadPhotosScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "ダウンロード",
    headerLeft: (
      <Icon
        style={{ marginLeft: 10 }}
        size={23}
        name="camera"
        color="#999"
        onPress={() => navigation.navigate("Camera")}
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sample}>DownloadPhotosScreen</Text>
      </View>
    );
  }
}

export default createStackNavigator(
  {
    DownloadPhotos: { screen: DownloadPhotosScreen }
  },
  {
    initialRouteName: "DownloadPhotos"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  sample: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
