import React from "react";
import { authService } from "fbase"
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

  const onSocialClick = async (event) => {
    const name = event.target.name;
    let provider;

    // create an instance of the provider object
    if (name === "google") {
      provider = new GoogleAuthProvider();
      await signInWithRedirect(authService, provider);
      // this will trigger a full page redirect away from your app
      const result = await getRedirectResult(authService)

      // after returning from the redirect when your app initializes you can obtain the result
      if(result){
        // the signed-in user info
        const user = result.user;
        // This gives you a Google Access Token. 
        // You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
      }
     
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      await signInWithPopup(authService, provider);
    }
    
    /*
      authenticate with Firebase using the provider object
      1. signInWithPopUp (by opening a pop-up window)
      2. signInWithRedirect (by redirecting to the sign-in page <= preferred on mobile devices)
    */
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;