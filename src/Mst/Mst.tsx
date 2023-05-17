import { types } from "mobx-state-tree";

const DirectMsgUser = types.model({
  UID: types.string,
  displayName: types.string,
  email: types.optional(types.string, ""),
  phone: types.maybeNull(types.string),
  photoURL: types.optional(types.string, ""),
});

const RootStore = types
  .model({
    directMessageUser: types.array(DirectMsgUser),
    isEmailEntered: types.boolean,
    isUserProfileActive: types.boolean,
    isUserEmailVerified: types.boolean,
    UserProfileInfo: types.maybeNull(DirectMsgUser),
    profileClicked: types.maybeNull(types.string),
  })
  .actions((self) => ({
    addNewDirectMsgUser(user: {
      UID: string;
      displayName: string;
      email: string;
      phone?: string;
      photoURL: string;
    }): void {
      const existingIndex = self.directMessageUser.findIndex(
        (u) => u.UID === user.UID
      );
      if (existingIndex === -1) {
        self.directMessageUser.push(user);
      } else {
        // If user already exists, update their displayName
        self.directMessageUser[existingIndex].displayName = user.displayName;
      }
      // Save state to local storage
      localStorage.setItem(
        "directMessageUser",
        JSON.stringify(self.directMessageUser)
      );
    },
    setEmailEntered(isEntered: boolean): void {
      console.log(isEntered, "isEntered");
      self.isEmailEntered = isEntered;
      // Save state to local storage
      // localStorage.setItem("isEmailEntered", isEntered.toString());
    },
    handleIsUserProfileActive(status: boolean): void {
      self.isUserProfileActive = status;
      // Save state to local storage
      localStorage.setItem("isUserProfileActive", status.toString());
    },
    setUserEmailVerified(verified: boolean): void {
      self.isUserEmailVerified = verified;
    },
    setUserProfile(user: {
      UID: string;
      displayName: string;
      email: string;
      photoURL: string;
      phone?: string | null | undefined;
    }) {
      self.UserProfileInfo = {
        ...user,
        phone: user.phone || null, // Assign null if phone is not provided
      };
    },
    setProfileClicked(name: string) {
      self.profileClicked = name;
      console.log(name);
    },
  }));

// Retrieve state from local storage
const directMessageUser = JSON.parse(
  localStorage.getItem("directMessageUser") || "[]"
);

const isEmailEntered = false;
const isUserProfileActive =
  localStorage.getItem("isUserProfileActive") === "true" || false;

const store = RootStore.create({
  directMessageUser,
  isEmailEntered,
  isUserProfileActive,
  isUserEmailVerified: false,
  UserProfileInfo: null,
  profileClicked: "",
});

export default store;
