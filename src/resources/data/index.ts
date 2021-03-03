import { api } from "../create-api";

export const getUser = () => {
  return api({
    url: "/user"
  });
};
