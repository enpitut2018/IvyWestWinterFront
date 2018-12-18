import React, { Component } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import TimeLineCard from "../organisms/TimeLineCard";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

class DownloadTimeLineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      refreshing: false
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

  reloadPhoto() {
    url = baseURL + "/downloads";
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
    const { photos } = this.state;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {photos.map((photo, index) => {
          return <TimeLineCard key={photo.id} photo={photo} />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#CCCCCC"
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

export default DownloadTimeLineScreen;
