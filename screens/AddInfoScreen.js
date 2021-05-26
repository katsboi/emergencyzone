import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { Input } from "react-native-elements";

import MyHeader from "../components/MyHeader";

export default class AddInfoScreen extends Component{
    constructor() {
        super();
        this.state = {
          userId: firebase.auth().currentUser.email,
          YourName: "",
          YourAddress: "",
          PlacesThatYouVisited:"",
        }
    }
    createUniqueId() {
        return Math.random().toString(36).substring(7);
      }

    addRequest = async (YourName,YourAddress,PlacesThatYouVisited) => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        
        db.collection("covid_info").add({
          user_id: userId,
          your_name: YourName,
          your_address: YourAddress,
          request_id: randomRequestId,
          places_that_you_visited: PlacesThatYouVisited,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          //image_link: books.data[0].volumeInfo.imageLinks.thumbnail,
        });
    
    
    
        this.setState({
            YourName: "",
            YourAddress: "",
            PlacesThatYouVisited: "",
        });
    
        Alert.alert("details added Successfully");
      };
    

    render(){
        return(
            <View style={{flex:1 , backgroundColor: "#1b1717" }}>
                <View style={{ flex: 0.1 }}>
            <MyHeader title="addInfo"/>
            </View>
            <View style={{ flex: 0.9 }}>
            <Input
            style={styles.formTextInput}
            label={"Your Name"}
            placeholder={"Your Name"}
            containerStyle={{ marginTop: RFValue(60) }}
            onChangeText={(text) => this.setState({YourName:text})}
            value={this.state.YourName}
          />
          <Input
            style={styles.formTextInput}
            label={"YourAddress"}
            placeholder={"YourAddress"}
            containerStyle={{ marginTop: RFValue(60) }}
            onChangeText={(text) =>  this.setState({YourAddress:text})}
            value={this.state.YourAddress}
          />
          <Input
            style={styles.formTextInput}
            label={"PlacesThatYouVisited"}
            placeholder={"PlacesThatYouVisited"}
            containerStyle={{ marginTop: RFValue(60) }}
            onChangeText={(text) => this.setState({PlacesThatYouVisited:text})}
            value={this.state.PlacesThatYouVisited}
          />
            <TouchableOpacity
                style={[styles.button, { marginTop: RFValue(30) }]}
                onPress={() => {
                  this.addRequest(
                    this.state.YourName,
                    this.state.YourAddress,
                    this.state.PlacesThatYouVisited,
                  );
                }}
              >
                <Text
                  style={styles.requestbuttontxt}
                >
                  AddDetails
                </Text>
              </TouchableOpacity>
            </View>
            </View>


        
        )
    }
}


const styles = StyleSheet.create({
    keyBoardStyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    formTextInput: {
      width: "75%",
      height: RFValue(35),
      borderWidth: 1,
      padding: 10,
    },
    ImageView:{
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
      marginTop:20
    },
    imageStyle:{
      height: RFValue(150),
      width: RFValue(150),
      alignSelf: "center",
      borderWidth: 5,
      borderRadius: RFValue(10),
    },
   
    buttonView:{
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center",
    },
    buttontxt:{
      fontSize: RFValue(18),
      fontWeight: "bold",
      color: "#fff",
    },
    touchableopacity:{
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      width: "90%",
    },
    requestbuttontxt:{
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#fff",
    },
    button: {
      width: "75%",
      height: RFValue(60),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(50),
      backgroundColor: "#810000",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
    },
  });