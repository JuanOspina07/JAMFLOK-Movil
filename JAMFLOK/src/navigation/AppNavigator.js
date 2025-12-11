import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

import SplashScreen from "../screens/Splash";
import Home from "./OptionsHome";
import Login from "../screens/Login";
import RecoverPassword from "../screens/Home/RecoverPassword";
import RegistroNavigator from "./RegistroNavigator";

import OptionsEntrepreneur from "./OptionsEntrepreneur";
import BusinessDetails from "../screens/Entrepreuner/BusinessDetails";
import EditAccountEntrepreneur from "../screens/Entrepreuner/EditAccountEntrepreneur";
import AddProducts from "../screens/Entrepreuner/AddProducts";
import EditBusiness from "../screens/Entrepreuner/EditBusiness";
import EditProduct from "../screens/Entrepreuner/EditProduct";

import OptionsAdmin from "./OptionsAdmin";
import Terminos from "../screens/Home/Terminos";
import Privacidad from '../screens/Home/Privacidad'; 
import Ayuda from '../screens/Home/Ayuda'; 
import AdminBusinessDetail from "../screens/Admin/AdminBusinessDetails";

import OptionCustomer from "./OptionsCustomer";
import EditAccountCustomer from "../screens/Customer/EditAccountCustomer";
import BusinessDetailsCliente from "../screens/Customer/DetailsBusinessCustomer";
import ReviewCustomer from "../screens/Customer/ReviewCustomer";
import OrderConfirmation from "../screens/Customer/OrderConfirmation";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegistroNavigator} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="Terminos" component={Terminos} />
      <Stack.Screen name="Privacidad" component={Privacidad} />
      <Stack.Screen name="Ayuda" component={Ayuda} />
    </Stack.Navigator>
  );
}

function AppStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {(() => {
        switch (user.idRol) {
          case 1:
            return (
              <>
                <Stack.Screen name="Emprendedor" component={OptionsEntrepreneur}/>
                <Stack.Screen name="NegocioDetalles" component={BusinessDetails}/>
                <Stack.Screen name="EditarCuentaEmprendedor" component={EditAccountEntrepreneur}/>
                <Stack.Screen name="AddProducts" component={AddProducts} />
                <Stack.Screen name="EditProducts" component={EditProduct} />
                <Stack.Screen name="EditBusiness" component={EditBusiness} />


              </>
            );

          case 2:
            return (
              <>
                <Stack.Screen name="Customer" component={OptionCustomer} />
                <Stack.Screen name="EditarCuentaCliente" component={EditAccountCustomer}/>
                <Stack.Screen name="NegocioCliente" component={BusinessDetailsCliente}/>
                <Stack.Screen name="ReviewCustomer" component={ReviewCustomer} />
                <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />               

              </>
            );

          case 3:
            return (
              <>
                <Stack.Screen name="Admin" component={OptionsAdmin} />
                <Stack.Screen name="Admin/Negocios" component={AdminBusinessDetail} />
              </>
            );

          default:
            return <Stack.Screen name="Login" component={Login} />;
        }
      })()}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <AppStack user={user} />}
    </NavigationContainer>
  );
}
