import { types, flow } from "mobx-state-tree";

const DirectMsgUser = types.model({
  UID: types.string,
  displayName: types.string,
});

const RootStore = types
  .model({
    directMessageUser: types.array(DirectMsgUser),
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
  }));

const store = RootStore.create({
  directMessageUser: [],
});

export default store;
