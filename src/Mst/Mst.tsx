import { types, flow } from "mobx-state-tree";

const DirectMsgUser = types.model({
  UID: types.string,
  displayName: types.string,
});

const RootStore = types
  .model({
    directMessageUser: types.array(DirectMsgUser),
    isEmailEntered: types.boolean,
    isUserProfileActive: types.boolean,
    isUserEmailVerified: types.boolean,
  })
  .actions((self) => ({
    addNewDirectMsgUser(user: { UID: string; displayName: string }): void {
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
});

export default store;
