import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/apps/:appId/graph", () => {
    return HttpResponse.json({
      nodes: [],
      edges: [],
    });
  }),
];
