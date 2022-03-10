import React from 'react';
import Nav from './component/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Categorypage from './pages/Categorypage';
import Singleproduct from './pages/Singleproduct';
import Productpage from './pages/Productpage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Contact from './pages/Contact';
import Signup from './Authentication/Signup';
import Signin from './Authentication/Signin';
import { QueryClientProvider, QueryClient } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import NavSidebar from './component/NavSidebar';
import Cart from './pages/Cart';
import Footer from './component/Footer';
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <main>
            <Nav />
            <NavSidebar />
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/products' component={Productpage} />
              <Route exact path='/contact-us' component={Contact} />
              <Route exact path='/shopping-cart' component={Cart} />
              <Route exact path='/signin' component={Signin} />
              <Route exact path='/signup' component={Signup} />
              <PrivateRoute exact path='/checkout' component={Checkout} />
              <Route exact path='/products/:id' component={Singleproduct} />
              <Route exact path='/:name' component={Categorypage} />
              <Route exact path='*' component={Error} />
            </Switch>
          </main>
          <Footer />
        </Router>
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
      </QueryClientProvider>
    </>
  );
};

export default App;
