import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import TouchablePhoto from "../parts/TouchablePhoto";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";

// 画面幅サイズを取得
const { width } = Dimensions.get("window");

export default class DownloadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      refreshing: false,
      filterUsers: null
    };
  }

  componentWillMount() {
    this.reloadPhoto();
  }

  componentDidMount() {
    this.timer = setInterval(this.autoReload, 1000);
  }

  componentWillUnMount() {
    clearInterval(this.timer);
  }

  //フィルタ対象のユーザーを読み込む
  loadFilterUsers = async () => {
    try {
      const filterUsers = await AsyncStorage.getItem("filterUsers");
      if (filterUsers !== null) {
        this.state.filterUsers = JSON.parse(filterUsers);
      }
    } catch (error) {
      console.error();
    }
  };

  reloadPhoto() {
    this.loadFilterUsers();
    if (this.state.filterUsers !== null) {
      //console.log(this.state.filterUsers);
    } else {
      url = baseURL + "/downloads";
    }
    getFetchWithToken(url)
      .then(json => {
        this.setState({
          photos: json.reverse(),
          refreshing: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // リフレッシュ非表示のため_onRefreshと似ているが定義した
  autoReload = () => {
    this.reloadPhoto();
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.reloadPhoto();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => Actions.UserFilterScreen()}>
            <View style={styles.filterSearchBar}>
              <Text>フィルタ</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          // 引っ張って更新
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.photoView}>
            {this.state.photos.map((photo, index) => {
              return (
                <TouchablePhoto
                  key={photo.id}
                  photo={photo}
                  width={width / 3}
                  height={width / 3}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  photoView: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  sample: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  filterContainer: {
    backgroundColor: "#FFF",
    justifyContent: "center"
  },
  filterSearchBar: {
    margin: 10,
    width: 300,
    backgroundColor: "#EEE",
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 30
  }
});
