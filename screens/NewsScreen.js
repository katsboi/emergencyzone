import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class NewsScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      addedCovidInfo: [],
    };
    this.requestRef = null;
  }

  getaddedCovidInfo = () => {
    this.requestRef = db
      .collection("covid_info")
      .onSnapshot((snapshot) => {
        var addedCovidInfo = snapshot.docs.map((doc) => doc.data());
        this.setState({
          addedCovidInfo: addedCovidInfo,
        });
      });
  };

  componentDidMount() {
    this.getaddedCovidInfo();
  }

  componentWillUnmount() {
  this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      
      <ListItem key={i} bottomDivider>
        <View style={{backgroundColor:"#000000"}}>
        <ListItem.Content>
          <ListItem.Title style={{color:'#eeebdd'}}>{item.your_name +" got corona"}</ListItem.Title>
          <ListItem.Subtitle style={{color:'#eeebdd'}}>{"My location is " +item.your_address}</ListItem.Subtitle>
          <Text style={{color:'#eeebdd'}}>{"I have visited " + item.places_that_you_visited +" in last two days"}</Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </View>

      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.view}>
        <MyHeader title="News" navigation={this.props.navigation} />
        <View style={{ flex: 1 ,backgroundColor: "#1b1717"}}>
          {this.state.addedCovidInfo.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Requested Books</Text>
            </View>
          ) : (
            <View style={{backgroundColor:"#1b1717"}}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.addedCovidInfo}
              renderItem={this.renderItem}
            />
             </View>
          )}
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b1717"
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  view:{
    flex: 1,
    backgroundColor: "#fff"
  }
});