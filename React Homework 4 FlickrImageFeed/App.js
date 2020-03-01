import React from 'react';

import ImageFeed from './ImageFeed.js';


// functional component
// assemble welcome component
function App() {
  return (

    <div className="App">

      <ImageFeed />

    </div>
    // 只能有一个节点，用 <div> 括起来就可以多个 <Clock>
  );
}
export default App;

