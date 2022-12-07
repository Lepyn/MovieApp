import movieDataBase from "./movieDataBase";

export const getRatedMovies = async () => {
  try {
    const {
      data: { id },
    } = await movieDataBase.get("/account", {
      params: {
        session_id: localStorage.getItem("session"),
      },
    });
    console.log("id", id);
    const res = await movieDataBase.get(`/account/${id}/rated/movies`, {
      params: {
        session_id: localStorage.getItem("session"),
      },
    });
    return res;
  } catch (e) {
    console.log("eeeee", e);
  }
};
