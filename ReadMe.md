# officejs-realtime-excel-addin

A proof-of-concept monorepo demonstrating a **real-time Excel Add-in** built with **Office.js**, **TypeScript**, and a custom **ribbon UI**, streaming live data via **WebSocket**.

This repo contains two modular, independently runnable projects:

1. **`excel-addin/`** — Office.js Excel Add-in with a custom ribbon button/task pane, written in TypeScript.
2. **`websocket-server/`** — A lightweight WebSocket server (TypeScript/Node.js) that pushes real-time sample data, used to simulate a live data feed.

---

## 📁 Project Structure

```
officejs-realtime-excel-addin/
├── excel-addin/            # Office.js Excel Add-in (TypeScript)
│   ├── src/
│   │   ├── taskpane/        # Task pane UI logic
│   │   ├── commands/        # Ribbon command handlers
│   │   └── services/        # WebSocket client, data mapping
│   ├── manifest.xml         # Add-in manifest (ribbon config)
│   ├── package.json
│   └── tsconfig.json
│
├── websocket-server/        # Real-time data WebSocket server (TypeScript)
│   ├── src/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                 # You are here
└── package.json               # Root workspace config (optional, if using npm workspaces)
```

---

## ✨ Features

- ✅ Custom Excel ribbon tab/button (Office.js)
- ✅ Task pane UI for controlling the live data connection
- ✅ WebSocket client inside the add-in for real-time updates
- ✅ Standalone WebSocket server to simulate/broadcast live data
- ✅ Fully written in TypeScript for type safety across both projects
- ✅ Modular folder structure — each project can run and be tested independently

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+
- Excel (desktop or Excel on the web) with sideloading enabled
- [Yeoman Office generator](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/yeoman-generator-overview) (if regenerating scaffolding)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/learn-with-santosh/officejs-realtime-excel-addin.git
cd officejs-realtime-excel-addin
```

### 2. Run the WebSocket server

```bash
cd websocket-server
npm install
npm run dev
```

The server will start broadcasting sample real-time data (default: `ws://localhost:8080`).

### 3. Run the Excel Add-in

In a separate terminal:

```bash
cd excel-addin
npm install
npm start
```

This will build the add-in, launch a local dev server (via `webpack-dev-server` or `office-addin-dev-certs`), and sideload it into Excel.

### 4. Use the Ribbon

- Open Excel — you should see a new **custom ribbon tab/button**.
- Click it to open the task pane.
- Click **Connect** to subscribe to the WebSocket server.
- Live data will populate into the active worksheet in real time.

---

## ⚙️ Configuration

| Setting             | Location                                   | Description                                       |
| ------------------- | ------------------------------------------ | ------------------------------------------------- |
| WebSocket URL       | `excel-addin/src/services/socketClient.ts` | Change the server endpoint the add-in connects to |
| Server Port         | `websocket-server/src/server.ts`           | Change the port the WebSocket server listens on   |
| Ribbon Labels/Icons | `excel-addin/manifest.xml`                 | Customize ribbon button text, icons, tab grouping |

---

## 🧩 How It Works

```
┌─────────────────────┐        WebSocket        ┌───────────────────────┐
│  websocket-server    │ <───────────────────── │   Excel Add-in         │
│  (broadcasts data)   │ ─────────────────────> │   (task pane + ribbon) │
└─────────────────────┘                          └───────────┬───────────┘
                                                                │
                                                     Office.js API
                                                                │
                                                                ▼
                                                     Excel Worksheet Cells
```

1. The **WebSocket server** simulates a live data source (e.g., prices, sensor data, metrics) and broadcasts updates to connected clients.
2. The **Excel Add-in**'s task pane connects to this server via a WebSocket client.
3. Incoming messages are parsed and written into the worksheet using the **Office.js API** (`Excel.run`).
4. The custom **ribbon button** lets the user trigger the task pane and control the connection (Connect/Disconnect) without leaving Excel.

---

## 📌 Roadmap / Next Steps

- [ ] Replace sample data with a real data source (stocks, IoT, etc.)
- [ ] Add reconnect/backoff logic to the WebSocket client
- [ ] Add unit tests for both projects
- [ ] Package add-in for production deployment (AppSource or internal distribution)
- [ ] Add authentication to the WebSocket server

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and distribute.

---

## 🤝 Contributing

This is a POC/demo project, but contributions, issues, and suggestions are welcome. Feel free to open a PR or issue.

---

## 📬 Contact

Maintained by [Your Name]. Reach out via GitHub Issues for questions or feedback.
