import {
  updateUserProfile,
  loginSuccess,
  updateUsername,
  LOGOUT,
} from "../reducers/userReducer";

const apiProfil = "http://localhost:3001/api/v1/user/profile";
const apiLogin = "http://localhost:3001/api/v1/user/login";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await fetch(apiLogin, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Incorrect username or password.");
    }

    const data = await response.json();

    // Handle different cases based on data or response status if needed
    switch (response.status) {
      case 200:
        dispatch(loginSuccess(data.body.token));
        navigate("/profile");
        return data.body.token;

      case 401:
        // Handle unauthorized case
        throw new Error("Unauthorized access.");

      default:
        throw new Error("Unexpected error occurred.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

export const loadUserInformation = (token) => async (dispatch) => {
  try {
    const profileResponse = await fetch(apiProfil, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error("Error retrieving profile details.");
    }

    const profileData = await profileResponse.json();
    dispatch(updateUserProfile(profileData.body));
  } catch (error) {
    console.error("Error loading user information:", error);
  }
};

export const updateUsernameSuccess =
  (newUsername, token) => async (dispatch) => {
    try {
      const response = await fetch(apiProfil, {
        method: "PUT",
        body: JSON.stringify({ userName: newUsername }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error updating username");
      }

      dispatch(updateUsername(newUsername));
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({ type: LOGOUT });
  navigate("/");
};
