import {rxStompConfig} from "./RxStompConfig";
import {RxStompService} from "./web-socket.service";

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(rxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
