import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://space-app-364302.uc.r.appspot.com",
});

const get = apiClient.get;
apiClient.get = async (url) => {
  const response = await get(url);

  if (response.ok) {
    return response;
  }

  console.log(response);
};

export default apiClient;
