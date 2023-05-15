import { types, flow } from "mobx-state-tree";

const DirectMsgUser = types.model({
  UID: types.string,
  displayName: types.string,
});

const RootStore = types
  .model({
    directMessageUser: types.array(DirectMsgUser),
    isEmailEntered: types.boolean,
  })
  .actions((self) => ({
    addNewDirectMsgUser(user: { UID: string; displayName: string }) {
      const existingIndex = self.directMessageUser.findIndex(
        (u) => u.UID === user.UID
      );
      if (existingIndex === -1) {
        self.directMessageUser.push(user);
      } else {
        // If user already exists, update their displayName
        self.directMessageUser[existingIndex].displayName = user.displayName;
      }
    },
    setEmailEntered(isEntered: boolean) {
      console.log(isEntered, "isEntered");
      self.isEmailEntered = isEntered;
    },
  }));

const store = RootStore.create({
  directMessageUser: [],
  isEmailEntered: false,
});

export default store;
