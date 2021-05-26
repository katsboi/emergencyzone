import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,TextInput } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  

export default class EmergencyScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            search:'',
            allData:[]
        }
    }
    
    keyExtractor = (item,index) => index.toString()
    renderItem = ({ item, i }) => {
        return (
          <TouchableOpacity onPress={()=>{  <MapView  
            style={styles.mapStyle}  
            showsUserLocation={false}  
            zoomEnabled={true}  
            zoomControlEnabled={true}  
            initialRegion={{  
              latitude: 28.579660,   
              longitude: 77.321110,  
              latitudeDelta: 0.0922,  
              longitudeDelta: 0.0421,  
            }}>  
    
            <Marker  
              coordinate={{ latitude: 28.579660, longitude: 77.321110 }}  
              title={"JavaTpoint"}  
              description={"Java Training Institute"}  
            />  
          </MapView>  }}>
          <ListItem key={i} bottomDivider>
            <View style={{backgroundColor:"#000000"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:'#eeebdd'}}>{"name: " +item.name }</ListItem.Title>
              <ListItem.Subtitle style={{color:'#eeebdd'}}>{"Address " + item.address}</ListItem.Subtitle>
              <Text style={{color:'#eeebdd'}}>{"Speciality " + item.speciality }</Text>
            </ListItem.Content>
            <ListItem.Chevron />
          </View>
    
          </ListItem></TouchableOpacity>
        );
      };

    searchFilterFunction = async (text) => {
        var allData= []
        var text1 = text.toLowerCase()
        var enteredText = text1.split("")
        if (enteredText[0] ==='h'){
            var data = db.collection('hospitals').get().then((querySnapshot)=> {
                querySnapshot.forEach((doc)=> {
                  allData.push(doc.data())
                  console.log('These are the ...',allData)
                })
                this.setState({allData})
              })
        }
        else if (enteredText[0] ==='f'){
          var data = db.collection('food').get().then((querySnapshot)=> {
              querySnapshot.forEach((doc)=> {
                allData.push(doc.data())
                console.log('These are the ...',allData)
              })
              this.setState({allData})
            })
      }
      else if (enteredText[0] ==='b'){
        var data = db.collection('banks').get().then((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
              allData.push(doc.data())
              console.log('These are the ...',allData)
            })
            this.setState({allData})
          })
    }
    else if (enteredText[0] ==='p'){
      var data = db.collection('police').get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
            allData.push(doc.data())
            console.log('These are the ...',allData)
          })
          this.setState({allData})
        })
  }
  else if (enteredText[0] ==='s'){
    var data = db.collection('stores').get().then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          allData.push(doc.data())
          console.log('These are the ...',allData)
        })
        this.setState({allData})
      })
    }
      
       
      };


    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="addInfo"/>
            <View style={styles.searchBar}>
            
            <TextInput
            style={styles.bar}
            placeholder="Search"
            onChangeText={text => this.setState({search:text})}
            value={this.state.search}/>
            <TouchableOpacity 
              style = {styles.searchButton}
              onPress = {()=>{this.searchFilterFunction(this.state.search)}}>
              <Text>Search</Text>
            </TouchableOpacity>
            </View>
    <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allData}
              renderItem={this.renderItem}
            />
       
</View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 40
    },
    searchBar:{
      flexDirection:'row',
      height:50,
      width:'auto',
      borderWidth:0.7,
      alignItems:'center',
      marginTop: 40
    },
    bar:{
      borderWidth:2,
      height:50,
      width:290,
      paddingLeft:10,
      fontWeight: "bold",
      fontSize: 15,
    },
    searchButton:{
      borderWidth:1,
      height:50,
      width:70,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#ff1319',
    }
  });