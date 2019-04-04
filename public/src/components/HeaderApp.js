import React from 'react';
import HeaderBar from './HeaderBar.js';
import HeaderMenu from './HeaderMenu.js';

const HeaderApp = function(props){
return(
<header className="header">
<HeaderBar pageTitle={props.pageTitle}/>
<HeaderMenu />
</header>
);
}

export default HeaderApp;