import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing,
  Text,
  StatusBar
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
    scale: new Animated.Value(1),
    translateY: new Animated.Value(0),
    show: true,
    fps: 1,
    secondPage: false,
    loop: true,
    tweenOptions: {
      tweenType: 'zoom',
      startXY: [80, 80],
      xTo: [140, 140],
      yTo: [140, 140],
      duration: 2000,
      loop: true,
     
    }
  };

  signUp = () => {
    // When click sign up just animated the owl make it bigger and move it up 
    const { scale, translateY } = this.state
    this.setState({show: false}, () => {
      Animated.timing(scale, {
        toValue: 10,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease
      }).start()

      Animated.timing(translateY, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease
      }).start(() => {
        this.setState({secondPage: true, email: "", password: ""})
      })

    })
  }
  handleEmailChange =text => {
    const {  animationType, allAnimationsTypes } = this.state
    this.setState({email: text})
    // case start typing 
   if(text.trim().length > 0 &&  animationType !== allAnimationsTypes[1] && text.trim().length < 12 ){
     console.log("Left Start")
     this.setState({animationType: allAnimationsTypes[1],  loop: false, fps: 10}, () => {
       this.refs.owl.startAnimation()
     })
     // case delete all typing
   }else if(text.trim().length == 0 && animationType !== allAnimationsTypes[0]){
   console.log("Back center")
     this.setState({animationType: allAnimationsTypes[0], loop: true, fps: 1 }, () => {
       this.refs.owl.startAnimation()
     })
    // case length of the input in the middle of the screen
   }else if(text.trim().length > 11 && text.trim().length < 29 && animationType !== allAnimationsTypes[2] ){
      console.log("CENTER")
      this.setState({animationType: allAnimationsTypes[2], loop: false, fps: 10 }, () => {
        this.refs.owl.startAnimation()
      })
    // case length on the input right of the screen
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
    // start typing password
    if(text.trim().length > 0 &&  animationType !== allAnimationsTypes[5] && text.trim().length < 4 ){
      this.setState({animationType: allAnimationsTypes[5],  loop: false, fps: 50}, () => {
        this.refs.owl.startAnimation()
      })
      // case delete all input in password
  }else if(text.trim().length === 0 && animationType !== allAnimationsTypes[0]){
    console.log("Back center")
      this.setState({animationType: allAnimationsTypes[0], loop: true, fps: 1 }, () => {
        this.refs.owl.startAnimation()
      })
       // after Three letter of typing password
    }else if(text.trim().length > 3 && text.trim().length < 9 && animationType !== allAnimationsTypes[4] ){
      console.log("Take a pick")
      this.setState({animationType: allAnimationsTypes[4], loop: false, fps: 10 }, () => {
        this.refs.owl.startAnimation()
      })
   }

}

  render() {
    const { email, loop, fps, password, scale, show, translateY, secondPage } = this.state
    // change the screen
   if(secondPage){
     return(
       <View style={styles.secondPage}>
          <StatusBar barStyle="light-content" />
      <Text style={{color: "#eee", fontSize: 50, fontWeight: "700", textAlign: "center"}}>وش رايكم حقين ال  UX</Text>
      <Button style={styles.btn}  color="#55a630" title="ارجع وراء" onPress={() => this.setState({secondPage: false, show: true})} />
      <Text style={{color: "#eee", fontSize: 30, fontWeight: "700", textAlign: "center"}}>@mansour789</Text>
    </View>
       )
   }else{
      // default screen
     return (
       <View style={styles.container}>
        <View style={styles.imageContainer}>
          <StatusBar barStyle="light-content" />
          {/* the owl image behind the animation so when click submit will translateY and be bigger */}
          <Animated.View style={{
            transform: [{scale}, {translateY}]
          }}>
          <Image source={require('./assets/img/center1.png')} style={[StyleSheet.absoluteFillObject, styles.img]} />

          </Animated.View>
          {show && 
          // the animation image
          <AnimatedSprite
          ref={"owl"}
          sprite={owlSprite}
          animationFrameIndex={owlSprite.animationIndex(
            this.state.animationType
            )}
            rotation={30}
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
              />
          }
        </View>
          {/* Input section */}
        <View style={{flex: 2}}>
          <TextInput style={styles.input} value={email} placeholderTextColor="#eee" onChangeText={this.handleEmailChange} placeholder="Email" />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="#eee"
            value={password} onChangeText={this.handlePasswordChange} 
            placeholder="Password"
            />
        <Button style={styles.btn}  color="#55a630" title="اسأل البومة الحكيمة" onPress={this.signUp} />
        </View>

      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111"
    
  },
  secondPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111"
  },
  imageContainer: {
   flex: 1,
   
  },
 btn: {
  color: "red",
  backgroundColor: "red"
 },
 img: {
 
  height: 190, 
  width: 190, 
  top: 88,
  left: 88,
  
 },

  input: {
    width: 350,
    height: 55,
    backgroundColor: "transparent",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 2,
    fontSize: 18,
    fontWeight: "500",
    color: "#eee"
  }
});
