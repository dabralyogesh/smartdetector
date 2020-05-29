import React from 'react';


const Navigation = ({isSignedIn, onRouteChange}) => {
	 	if(isSignedIn)
	 	{
	 	 return(
          <nav style ={{display:'flex', justifyContent:'flex-end'}}>
           	<p onClick = {() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
          </nav>
          )
         }
         else{
          return(
          <nav style ={{display:'flex', justifyContent:'flex-end'}}>
          	<p onClick = {() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
           	<p onClick = {() => onRouteChange('SignIn')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
          </nav>
          )
         }
}
export default Navigation;