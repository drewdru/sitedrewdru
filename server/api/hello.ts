import type { IncomingMessage, ServerResponse } from "http";
import { useQuery } from "h3";

export default (req: IncomingMessage, _res: ServerResponse) => {
  return {
    query: useQuery(req),
  };
};
