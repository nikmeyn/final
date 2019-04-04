import React from 'react';

const HeaderBar = function(props){
return (
	<div className="header-titles">
	<h1>{props.pageTitle}</h1>
	</div>
);
}

export default HeaderBar;