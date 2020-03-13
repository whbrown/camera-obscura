import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./utils/auth0";
// import config from "./auth_config.json";
import history from "./utils/history";

const auth0Domain = 'dev-6ee01shs.auth0.com'
const auth0ClientId = 'aZ60RtiKvIy8oqNDIu27OW0Mupyd7KDk'
const auth0Audience = 'whbrown.org/camera-obscura/api/v1'
const auth0RedirectUri = window.location.origin

if (
  auth0Domain === undefined
  || auth0ClientId === undefined
  || auth0Audience === undefined
) {
  throw new Error('missing env vars')
}

const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
  console.log(
    'auth0 onRedirectCallback called with redirectState %o',
    redirectResult
  )

  // Clears auth0 query string parameters from url
  const targetUrl = redirectResult
    && redirectResult.appState
    && redirectResult.appState.targetUrl
    ? redirectResult.appState.targetUrl
    : window.location.pathname

  history.push(targetUrl)
}

ReactDOM.render(
  (
    <Auth0Provider
      domain={auth0Domain}
      client_id={auth0ClientId}
      redirect_uri={auth0RedirectUri}
      audience={auth0Audience}
      onRedirectCallback={onAuthRedirectCallback}
    >
      <App />
    </Auth0Provider>
  ),
  document.getElementById('root')
)