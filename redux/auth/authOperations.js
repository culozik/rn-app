import "firebase/compat/auth";

import db from "./../../firebase/config";
import authSlice from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .signInWithEmailAndPassword(email, password);

      console.log("user: ", user);
    } catch (error) {
      console.log("error ", error);
      console.log("error.message ", error.message);
    }
  };

const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      await db.auth().currentUser.updateProfile({ displayName: login });

      const {
        uid,
        email: userEmail,
        displayName,
      } = await db.auth().currentUser;

      const userUpdateProfile = {
        userId: uid,
        email: userEmail,
        nickName: displayName,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error ", error);
      console.log("error.message ", error.message);
    }
  };

const authLogOutUser = () => async (dispatch, getState) => {
  try {
    await db.auth().signOut();
    dispatch(authSignOut());
  } catch (error) {
    console.log(error);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        email: user.email,
        nickName: user.displayName,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignInUser, authSignUpUser, authLogOutUser, authStateChangeUser };
