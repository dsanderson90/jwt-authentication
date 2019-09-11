import React from 'react';

function Home() {
  return (
    <div className="App">
 <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={Secret} />
      </div>
    </Router>
    </div>
  );
}

export default App;
