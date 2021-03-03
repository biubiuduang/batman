import { Random } from "mockjs";

const list: Array<any> = [];
for (let i = 0; i < 10; i++) {
  list.push({
    id: Random.id(),
    name: Random.name(),
    code: Random.integer(1000000,8000000),
    createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    updateTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
  })
}
export default [
  {
    url: "/user",
    method: "get",
    response: {
      code: 0,
      message: "success",
      data: {
        id: 1,
        username: "admin"
      }
    }
  },
  {
    url: "/user/list",
    method: "get",
    response: {
      code: 0,
      message: "success",
      data: list
    }
  }
];
