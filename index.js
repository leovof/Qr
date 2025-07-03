const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const P = require("pino");

(async () => {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: "silent" }),
    browser: ['Ubuntu', 'Chrome', '20.0']
  });

  sock.ev.on("creds.update", saveCreds);
})();
