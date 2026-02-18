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
];

export default handlers;
