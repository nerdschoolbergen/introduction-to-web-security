// Loads sqlite3 and explains how to fix it when its native module is missing
// (npm configured with ignore-scripts=true) or built for another OS.
let sqlite3;

try {
  ({ default: sqlite3 } = await import("sqlite3"));
} catch (error) {
  const isNativeModuleError =
    error.code === "ERR_DLOPEN_FAILED" || error.message?.includes("Could not locate the bindings file");
  if (!isNativeModuleError) {
    throw error;
  }

  console.error(`
Could not load the sqlite3 native module:
  ${error.message.split("\n")[0]}

This usually means sqlite3's install script didn't run during \`npm install\`
(for example because npm is configured with ignore-scripts=true), or that
node_modules was installed on a different operating system.

Fix it by running this command in the vulnerable-application folder,
then start the app again:

  npm rebuild sqlite3 --ignore-scripts=false
`);
  process.exit(1);
}

export default sqlite3;
