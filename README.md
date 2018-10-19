# IvyWestWinterFront

## エレベータピッチ

写真に写ってる人に共有するのが面倒なことと  
自分の写っている写真を簡単に集めたいという問題を解決したい  
自分の写真が欲しい人向けの  
とった瞬間に自動で適切なユーザに共有される  
写真共有サービスです。  
これは顔認識でユーザの写真に写っている人を識別し、写っている人だけに自動で共有することができ、  
GoogleフォトやLINEアルバムとは違って  
圧倒的スピードで手間なく写真が共有できます。

## 前提環境

以下の環境で動作確認を行っている

* node v8.11.4
* npm 5.6.0
* watchman v4.9.0
* react-native-cli v2.0.1
* react-native v0.57.1

> なんかのバージョンが古いなどで不具合出たら教えてください


## 環境設定

以下のサイトの`Building Projects with Native Code`に従って環境設定を行った

https://facebook.github.io/react-native/docs/getting-started.html

* iOSで起動

```
$ react-native run-ios
```

* Androidで起動

```
$ react-natvie run-android
```

変なエラーが起きたら`react-native start --reset-cache`で起動してみるといいかも


## 参考リンク

* 主な使用ライブラリ

  * [React Navigation · Routing and navigation for your React Native apps](https://reactnavigation.org/)

  * [NativeBase | Essential cross-platform UI components for React Native](https://nativebase.io/)

  * [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#icon-component)
