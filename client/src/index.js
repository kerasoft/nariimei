import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import UpdatePasswordScreen from './screens/UpdatePasswordScreen';
import ShippingScreen from './screens/ShippingScreen';
import NewAddressScreen from './screens/NewAddressScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import AdminRoute from './components/AdminRoute';
import AdminOrdersScreen from './screens/AdminOrdersScreen';
import AdminOrderScreen from './screens/AdminOrderScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/update-password' element={<UpdatePasswordScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/new-address' element={<NewAddressScreen />} />
        <Route path='/payment' element={<PaymentScreen />}/>
        <Route path='/place-order' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/orders' element={<OrdersScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orders' element={<AdminOrdersScreen />} />
        <Route path='/admin/orders/:id' element={<AdminOrderScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.Fragment>
);
