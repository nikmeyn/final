import React from 'react';
import { Link } from 'react-router-dom';
const HeaderMenu = function(props){
return(
<nav>
<Link to='/home'>
<button>Home</button>
</Link>
<Link to='/browse'>
<button>Browse</button>
</Link>
<Link to='/about'>
<button>About</button>
</Link>
<Link to='/upload-image'>
<button>Upload Image</button>
</Link>
<Link to='/Login'>
<button>Logout</button>
</Link>
</nav>
);
}

export default HeaderMenu;