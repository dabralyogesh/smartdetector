import React from 'react';

class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state={
			registerName:'',
			registerEmail:'',
	     	registerPassword:''
		}
	}

	onregisterNameChange =(event)=>{
     this.setState({registerName:event.target.value});
	}

	onregisterEmailChange =(event)=>{
     this.setState({registerEmail:event.target.value});
	}

    onregisterPasswordChange =(event)=>{
     this.setState({registerPassword:event.target.value});
	}

    onSubmitClick =()=>{
    	const{registerName, registerEmail, registerPassword}=this.state;
    	if(registerName.length>0 && registerEmail.length>0 && registerPassword.length>0)
    	{
	    	fetch("https://facedetectorap.herokuapp.com/register",{
	    		method:'post',
	    		headers:{'Content-Type':'application/json'},
	    		body:JSON.stringify({
	    			name: registerName,
	    			email:registerEmail,
	    			password:registerPassword
	    		})
	    	}).then(response =>response.json())
	    	  .then(data =>{
	    	  	 if(data.user_id){
	    	  	 	this.props.onRouteChange('home');
	    	  	 	this.props.loadUser(data);
	    	  	 }
	    	  })
        }
    }

   render(){
   	 const {onRouteChange} = this.props;
		return(
		<article className="br6 shadow-4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">	
		       <main className="pa4 black-80 w-100">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db `fw6 lh-copy f6" forHTML="name">Name</label>
				        <input onChange={this.onregisterNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
				      </div>
				      <div className="mt3">
				        <label className="db `fw6 lh-copy f6" forHTML="email-address">Email</label>
				        <input onChange={this.onregisterEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" forHTML="password">Password</label>
				        <input onChange={this.onregisterPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="lh-copy mt3">
				      <p onClick = {this.onSubmitClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="register">Register</p>
				    </div>
				  </div>
		     </main>
		 </article>
		)
    }
}

export default Registration;