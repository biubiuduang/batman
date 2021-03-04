import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { UserType } from "@/@types/user";
import { getUser } from "@/resources/data";

@Module
export default class UserState extends VuexModule {
  user: UserType = { id: "", username: "" };

  @Mutation
  setUser(user: UserType) {
    this.user = user;
  }

  @Action({ commit: "setUser" })
  async fetchUser() {
    const { data } = await getUser();
    return data;
  }
}
