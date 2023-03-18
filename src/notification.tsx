import { Queue } from "./queue";
import { common } from "replugged";
//import type { Root } from "react-dom/client";
import MessageCard from "./messageCard";
import { messageObj } from "./interfaces";
import "./styles.css";

const NotificationQueue = new Queue();
let reactRoot: any;

interface NotificationInterface {
  key: number;
  messageObject: messageObj;
  onClose?(): void;
  closeAll?(): void;
}

function getRoot() {
  if (!reactRoot) {
    const container = document.createElement("div");
    // container.id = "vc-notification-container";
    document.body.append(container);
    reactRoot = common.ReactDOM.createRoot(container);
  }
  return reactRoot;
}

function _showNotification(notification: NotificationInterface): any {
  const root = getRoot();
  return new Promise<void>((resolve) => {
    root.render(
      <MessageCard
        key={notification.key}
        messageObject={notification.messageObject}
        onClose={() => {
          notification.onClose?.();
          root.render(null);
          resolve();
        }}
        closeAll={() => {
          notification.closeAll?.();
          _flusQueue();
          root.render(null);
          resolve();
        }}></MessageCard>,
    );
  });
}

function _flusQueue(): void {
  NotificationQueue.flush();
}

export async function showNotification(data: NotificationInterface) {
  await NotificationQueue.push(() => _showNotification(data));
}
