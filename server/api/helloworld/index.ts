import type { IncomingMessage, ServerResponse } from "http";

export default (_req: IncomingMessage, _res: ServerResponse) => {
  return {
    data: `Hello world! (Generated at ${new Date().toUTCString()})`,
  };
};
