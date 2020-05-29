import React, {Component}from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Registration from './Components/Registration/Registration';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import 'tachyons';


const particleOptions ={
  particles: {
                number:{
                  value:80,
                  density:{
                    enable:true,
                    value_area:400,
                  }
                }
              }
}
const initialState={
      input:'',
      imageUrL:'',
      dimension:{},
      route:'SignIn',
      isSignedIn: false,
      user:{
        userId:'',
        userName:'',
        userEmail:'',
        userEntries:0,
      }
    }

class App extends Component{
  constructor(){
    super();
    this.state= initialState;
  }
 
 calculateFaceLocation =(data) =>{
 const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
 const image = document.getElementById('inputImage');
 const width = Number(image.width);
 const height = Number(image.height);
 return {
   top_row : clarifaiFace.top_row*width,
   bottom_row : height - clarifaiFace.bottom_row*width,
   left_col: clarifaiFace.left_col*width,
   right_col : width - clarifaiFace.right_col*width
  }
 } 

FaceBox = (facedimensions) =>{
  this.setState({dimension:facedimensions})
}

onInputChange = (event) =>{
  this.setState({input:event.target.value})
}

onSubmit = () => {
  this.setState({imageUrL:this.state.input});
    fetch("https://facedetectorap.herokuapp.com/imageurl",{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            input:this.state.input
          })
        })
      .then(response=>response.json())
      .then((response) =>{ 
         fetch("https://facedetectorap.herokuapp.com/image",{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.userId
          })
        })
         .then(response =>response.json())
         .then(data => this.setState(Object.assign(this.state.user,{userEntries:data}))) 
        this.FaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err))
}

onRouteChange = (route) =>{
  if(route === 'home')
    this.setState({isSignedIn:true});
  else
   this.setState(initialState);
 this.setState({route:route})
}

 
 loadUser = (user) => {
  const{entries,user_id,name,email}=user;
  this.setState(Object.assign(this.state.user,{userId:user_id,
                                               userName:name,
                                               userEmail:email,
                                               userEntries:entries 
                                               }))

 }

  render(){
    return (
      <div className="App">
        <Particles className= "particles" params={particleOptions}/>
        <Navigation isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route == 'home'
          ? <div>
              <Logo/>
              <Rank userName={this.state.user.userName} userEntries={this.state.user.userEntries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition imageUrL={this.state.imageUrL}  boxdimension = {this.state.dimension}/> 
            </div>
            :(this.state.route == 'SignIn' ||this.state.route == 'signout' ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> : <Registration onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>)
         }
      </div>
  )}
}

export default App;
