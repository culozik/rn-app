import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import { authStateChangeUser } from "../../redux/auth/authOperations";
import { useRoute } from "../../router";

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  useEffect(() => {}, []);

  const routing = useRoute(stateChange, navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>{routing}</NavigationContainer>
  );
};

export default Main;
