import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
// import Icon from "react-native-vector-icons/FontAwesome";
import CameraButton from "./src/components/parts/CameraButton";
import AuthScreen from "./src/components/screens/AuthScreen";
import SigninScreen from "./src/components/screens/SigninScreen";
import SignupScreen from "./src/components/screens/SignupScreen";
import DownloadTimeLineScreen from "./src/components/screens/DownloadTimeLineScreen";
import DownloadPhotosScreen from "./src/components/screens/DownloadPhotosScreen";
import UploadPhotosScreen from "./src/components/screens/UploadPhotosScreen";
import PhotoDetailScreen from "./src/components/screens/PhotoDetailScreen";
import UserScreen from "./src/components/screens/UserScreen";
import { Router, Scene, Tabs, Actions } from "react-native-router-flux";
import { asyncStorageKeyPrefix } from "./src/libs/const";
import UserFilterScreen from "./src/components/screens/UserFilterScreen";
import SplashScreen from "react-native-splash-screen";

const TabIcon = props => {
  const color = props.focused ? "#4c91ff" : "#999";
  return <Icon size={27} name={props.iconName} color={color} />;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(asyncStorageKeyPrefix + "token").then(token => {
      if (token !== null) {
        this.setState({ isLogin: true });
      }
    });
  }
  componentDidMount() {
    SplashScreen.hide();
  }

  photoDetailScene = () => (
    <Scene key="photoDetail" title="写真詳細" component={PhotoDetailScreen} />
  );

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Tabs key="tab" showLabel={false}>
            <Scene
              key="downloads"
              initial={this.state.isLogin == true}
              title="もらった写真"
              tabBarLabel="もらった写真"
              iconName="home"
              icon={TabIcon}
            >
              <Tabs
                key="downloadTab"
                // TODO カラーの設定
                activeTintColor="#4c91ff"
                inactiveTintColor="#000000"
                indicatorStyle={{ backgroundColor: "#4c91ff", height: 3 }}
                labelStyle={{ fontWeight: "bold" }}
                tabBarStyle={{ backgroundColor: "white" }}
                tabBarPosition="top"
                headerMode="none"
                showLabel={true}
              >
                <Scene
                  key="downloadTimeLine"
                  initial={true}
                  tabBarLabel="タイムライン"
                  component={DownloadTimeLineScreen}
                />
                <Scene
                  key="downloadPhoto"
                  tabBarLabel="サムネイル"
                  component={DownloadPhotosScreen}
                />
              </Tabs>
              {this.photoDetailScene()}
              <Scene
                key="UserFilterScreen"
                title="写っている人を追加"
                component={UserFilterScreen}
              />
            </Scene>
            <Scene
              key="uploads"
              tabBarLabel="撮った写真"
              iconName="cloud-upload"
              icon={TabIcon}
            >
              <Scene
                key="uploadPhoto"
                initial={true}
                title="撮った写真"
                component={UploadPhotosScreen}
                tabBarLabel="撮った写真"
                iconName="upload"
                icon={TabIcon}
              />
              {this.photoDetailScene()}
            </Scene>
            <Scene
              key="user"
              title="ユーザー情報"
              component={UserScreen}
              tabBarLabel="ユーザー"
              iconName="user"
              icon={TabIcon}
            />
            <Scene
              key="camera"
              title="撮影"
              component={UserScreen}
              // componentを使用せず、擬似的にボタンを設置してカメラ起動を実装した
              tabBarLabel="撮影"
              icon={() => CameraButton()}
            />
          </Tabs>
          <Scene key="auth" initial={this.state.isLogin == false}>
            <Scene key="authHome" component={AuthScreen} />
            <Scene key="signin" title="サインイン" component={SigninScreen} />
            <Scene key="signup" title="サインアップ" component={SignupScreen} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
