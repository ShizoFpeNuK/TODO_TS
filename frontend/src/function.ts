import axios from "axios";

export async function getToDoList(pathDefault: string) {
  await axios.get(pathDefault)
    .then((res) => {
      return res.data.result
    }).catch((error) => {
      console.log(error);
    })
}