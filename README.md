# Chatangle

[![Greenkeeper badge](https://badges.greenkeeper.io/pRizz/Chatangle.svg)](https://greenkeeper.io/)

A free, decentralized, global chatroom, powered by the IOTA tangle. This must be run in conjunction with the [Chatangle Backend](https://github.com/pRizz/Chatangle-Backend).

# Usage
You must have a working [Chatangle Backend](https://github.com/pRizz/Chatangle-Backend) running.

You must set some environment variables before running. These may be set from an IDE.

```bash
CHATANGLE_BACKEND_IP=localhost
CHATANGLE_BACKEND_PORT=8008
IS_CHATANGLE_BACKEND_SECURED=false
```

`IS_CHATANGLE_BACKEND_SECURED` determines whether the front end connects with the WebSocket protocol, `ws`, or the Secure WebSocket protocol, `wss`.

Running in dev mode:

```bash
npm run dev
```

or

```bash
npm run start
```

# Serving Over the Web

You must have a working [Chatangle Backend](https://github.com/pRizz/Chatangle-Backend) running.

You must set some environment variables before running. These may be set from an IDE.

```bash
CHATANGLE_BACKEND_IP=localhost
CHATANGLE_BACKEND_PORT=8008
IS_CHATANGLE_BACKEND_SECURED=false
```

`IS_CHATANGLE_BACKEND_SECURED` determines whether the front end connects with the WebSocket protocol, `ws`, or the Secure WebSocket protocol, `wss`.

To create build files:

```bash
npm build
```

This will generate all needed files in `./dist` which may then be served over S3 or any webserver.
