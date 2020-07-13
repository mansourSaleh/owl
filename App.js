import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView
} from "react-native";

import AnimatedSprite from './src/react-native-animated-sprite'
import owlSprite from "./src/owlSprite/owlSprite";

const {width, height} = Dimensions.get("window")

export default class App extends React.Component {
  state = {
    email: "",
    password: "",
    animationType: "IDLE",
    allAnimationsTypes : ['IDLE', 'LEFT', 'CENTER', 'RIGHT', 'OPEN', 'CLOSE', 'ALL'],
    fps: 1,
    loop: true,
    tweenOptions: {
      tweenType: 'sine-wave',
      startXY: [83, 81],
      xTo: [88,88],
      yTo: [88, 88],
      duration: 2000,
      loop: true,
     
    }
  };

  signUp = () => {
    this.refs.owl.startTween();
  }
  handleEmailChange =text => {
    const {  animationType, allAnimationsTypes } = this.state
    this.setState({email: text})
   if(text.trim().length > 0 &&  animationType !== allAnimationsTypes[1] && text.trim().length < 12 ){
     console.log("Left Start")
     this.setState({animationType: allAnimationsTypes[1],  loop: false, fps: 10}, () => {
       this.refs.owl.startAnimation()
     })

   }else if(text.trim().length == 0 && animationType !== allAnimationsTypes[0]){
   console.log("Back center")
     this.setState({animationType: allAnimationsTypes[0], loop: true, fps: 1 }, () => {
       this.refs.owl.startAnimation()
     })
   }else if(text.trim().length > 11 && text.trim().length < 29 && animationType !== allAnimationsTypes[2] ){
      console.log("CENTER")
      this.setState({animationType: allAnimationsTypes[2], loop: false, fps: 10 }, () => {
        this.refs.owl.startAnimation()
      })
   } else if(text.trim().length > 28  && animationType !== allAnimationsTypes[3] ){
    console.log("RIGHT")
    this.setState({animationType: allAnimationsTypes[3], loop: false, fps: 10 }, () => {
      this.refs.owl.startAnimation()
    })
 }
   
  }

  handlePasswordChange = text => {
    this.setState({password: text})
    const {  animationType, allAnimationsTypes } = this.state
    if(text.trim().length > 0 &&  animationType !== allAnimationsTypes[5] && text.trim().length < 4 ){
      this.setState({animationType: allAnimationsTypes[5],  loop: false, fps: 50}, () => {
        this.refs.owl.startAnimation()
      })
  }else if(text.trim().length === 0 && animationType !== allAnimationsTypes[0]){
    console.log("Back center")
      this.setState({animationType: allAnimationsTypes[0], loop: true, fps: 1 }, () => {
        this.refs.owl.startAnimation()
      })
    }else if(text.trim().length > 3 && text.trim().length < 9 && animationType !== allAnimationsTypes[4] ){
      console.log("Take a pick")
      this.setState({animationType: allAnimationsTypes[4], loop: false, fps: 10 }, () => {
        this.refs.owl.startAnimation()
      })
   }

}

  componentDidMount(){
  //   console.log(this.refs.owl.getCoordinates())
  //  this.refs.owl.startTween();
  }

  render() {
    const { email, loop, fps, password } = this.state
    // console.log(loop, this.state.animationType)
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <AnimatedSprite
            ref={"owl"}
            sprite={owlSprite}
            animationFrameIndex={owlSprite.animationIndex(
              this.state.animationType
            )}
            loopAnimation={loop}
            coordinates={{
              top: height / 10,
              left: width /4.5
            }}
            size={{
              width: owlSprite.size.width *2,
              height: owlSprite.size.height *2
            }}
            fps={fps}
            draggable={false}
            tweenOptions={this.state.tweenOptions}
            tweenStart={"fromPress"}
            // onPress={() => {
            //   this.onPress();
            // }}
          />
        </View>

        <View style={{flex: 2}}>
          <TextInput style={styles.input} value={email} onChangeText={this.handleEmailChange} placeholder="Email" />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password} onChangeText={this.handlePasswordChange} 
            placeholder="Password"
          />
        <Button title="Sign Up" onPress={this.signUp} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
  imageContainer: {
   flex: 1,
 
   
  },
 

  input: {
    width: 350,
    height: 55,
    backgroundColor: "transparent",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 8,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    fontSize: 18,
    fontWeight: "500"
  }
});
