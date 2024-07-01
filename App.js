import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', fullname: '', age: '', password : '', secureTextEntry : true,};
  }

  Register = (navigation) => {
    let email = this.state.email;
    let fullname = this.state.fullname;
    let age = this.state.age;
    let password = this.state.password;
    

    if (email.length === 0 || fullname.length ===0 || age.length === 0) {
      alert("Required Field is Missing");
    } else {
      let InsertAPIURL = "http://192.168.0.94/kyleapi/api/insert.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        email: email,
        fullname: fullname,
        age: age,
        password: password
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) =>response.json())
      .then((response)=>{
        alert(response[0].Message);
      })
      .catch((error) => {
        alert("Error"+error);
      })
      this.props.navigation.navigate("login")
    }
  }
 




  render() {
    return(
      <View style={styles.ViewStyle}>
        <TextInput 
          placeholder={"email"}
          placeholderTextColor={"tomato"}
          style={styles.txtStyle}
          onChangeText={email => this.setState({email})}
        />
        <TextInput 
          placeholder={"fullname"}
          placeholderTextColor={"tomato"}
          style={styles.txtStyle}
          onChangeText={fullname => this.setState({fullname})}
        />
        <TextInput 
          placeholder={"age"}
          placeholderTextColor={"tomato"}
          style={styles.txtStyle}
          onChangeText={age => this.setState({age})}
        />
        <TextInput 
          placeholder={"Password"}
          placeholderTextColor={"tomato"}
          style={styles.txtStyle}
          secureTextEntry={this.state.secureTextEntry ? true : false}
          onChangeText={password => this.setState({password})}
        />
        <Button
          title={"Register"}
          onPress={this.Register}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
   ViewStyle: {
     flex: 1,
     padding: 60,
     marginTop: 20
   },
   txtStyle: {
     borderBottomWidth: 1,
     borderBottomColor: 'tomato',
     marginBottom: 30
   }
});
