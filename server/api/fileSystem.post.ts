const getBase = async () => {
  const fs = (await import("fs")).default;
  return [fs, ""] as [typeof fs, string];
};

export type writeFile = (path: string, content: string) => Promise<boolean>;
export const writeFile: writeFile = async (path, content) => {
  const [fs, basePath] = await getBase();
  return new Promise<boolean>((resolve, reject) => {
    fs.writeFile(basePath + path, content, (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

export type writeFileObject = (
  path: string,
  content: string
) => Promise<boolean>;
export const writeFileObject: writeFileObject = async (path, content) => {
  const [fs, basePath] = await getBase();
  return new Promise<boolean>((resolve, reject) => {
    fs.writeFile(basePath + path, JSON.stringify(content), (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

export type readFile = (path: string) => Promise<string>;
export const readFile: readFile = async (path: string) => {
  const [fs, basePath] = await getBase();
  return new Promise<string>((resolve, reject) => {
    fs.readFile(basePath + path, "utf8", (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

export type readFileObject = <T extends object>(path: string) => Promise<T>;
export const readFileObject: readFileObject = async <T extends object>(
  path: string
) => {
  const [fs, basePath] = await getBase();
  return new Promise<T>((resolve, reject) => {
    fs.readFile(basePath + path, "utf8", (err, data) => {
      if (err) return reject(err);
      return resolve(JSON.parse(data) as T);
    });
  });
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const body = await readBody(event);
  switch (query["function"]) {
    case "writeFile":
      return await writeFile(body.path, body.content);
    case "writeFileObject":
      return await writeFileObject(body.path, body.content);
    case "readFile":
      return await readFile(body.path);
    case "readFileObject":
      return await readFileObject(body.path);
    default:
      throw new Error(`Unsupported function: ${query["function"]}`);
  }
});
