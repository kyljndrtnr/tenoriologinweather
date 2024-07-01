import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
    };
  }

  Register = () => {
    let email = this.state.email;
    let password = this.state.password;

    if (email.length === 0 || password.length === 0) {
      alert("Required Field is Missing");
    } else {
      let InsertAPIURL = "http://192.168.0.94/kyleapi/api/login.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        email: email,
        password: password
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response[0].Message);
        })
        .catch((error) => {
          alert("Error" + error);
        })
      this.props.navigation.navigate("weather");
    }
  }

  register = () => {
    this.props.navigation.navigate("register");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={this.state.secureTextEntry}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={this.Register}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={this.register}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold'
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
