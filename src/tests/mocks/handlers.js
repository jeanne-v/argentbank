import { http, HttpResponse } from "msw";

const handlers = [
  http.post("http://localhost:3001/api/v1/user/login", async ({ request }) => {
    const data = await request.json();
    if (data.email === "test-email" && data.password === "test-password") {
      return HttpResponse.json(
        { message: "User successfully logged in", body: { token: "mockToken" } },
        { status: 200 },
      );
    } else {
      return HttpResponse.json({ message: "Error : wrong credentials" }, { status: 400 });
    }
  }),
  http.post("http://localhost:3001/api/v1/user/profile", async ({ request }) => {
    if (request.headers.get("Authorization") === "Bearer mockToken") {
      return HttpResponse.json(
        {
          message: "Successfully got user profile data",
          body: {
            email: "joeschmoe@email.com",
            firstName: "Joe",
            lastName: "Schmoe",
          },
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }),
  http.put("http://localhost:3001/api/v1/user/profile", async ({ request }) => {
    if (request.headers.get("Authorization") === "Bearer mockToken") {
      const data = await request.json();
      return HttpResponse.json(
        {
          message: "Successfully updated user profile data",
          body: {
            email: "joeschmoe@email.com",
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }),
];

export default handlers;
