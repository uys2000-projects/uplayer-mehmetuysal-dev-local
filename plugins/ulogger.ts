import { setULogger } from "u-logger";

if (import.meta.server)
  setULogger(
    true,
    (name, args) => console.log([name, JSON.stringify(args)].join(" :: ")),
    (name, args) => console.log([name, JSON.stringify(args)].join(" :: ")),
    (name, args) => console.log([name, JSON.stringify(args)].join(" :: "))
  );
else
  setULogger(
    true,
    (name, args) => console.log([name, args]),
    (name, args) => console.log([name, args]),
    (name, args) => console.log([name, args])
  );

export default defineNuxtPlugin({});
