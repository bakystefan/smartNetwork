import { reduxStore } from '../../App';
import { calculateCalibrateValues } from '../utils/calculateCalibrateValues';
import { calculateISPSpeed } from '../utils/calculateISPSpeed';
import NetworkActions from '../redux/reducers/network';


interface IWebSocketService {
  createWss: Function,
  listenForEvents: Function
}

const defaultUrl = 'wss://c.smart.network/appData';
const defaultHeader = {
  headers: {
    "Authorization": '',
    "Smart-Network-Router": '',
    "Smart-Device-Timezone-IANA": '',
    "Smart-Network-IP": "172.30.7.252",
    "Smart-Network-AppVersion": 9,
    "Smart-Network-UDID": '',
  }
}

class WebSocketService implements IWebSocketService {
  ws = null;
  createWss(url = defaultUrl , header = defaultHeader, onMessageCallback) {
    if (this.ws !== null) {
      this.ws.terminate();
    }
    this.ws = new WebSocket(url, '', header);
    this.listenForEvents(onMessageCallback);
    return this.ws;
  }


  listenForEvents(onMessageCallback) {
    if (this.ws === null) return;

    this.ws.onopen = () => {
      // connection opened
      console.log("CONNECTION OPEN");
    };

    this.ws.onmessage = (e) => {
      if (onMessageCallback instanceof Function) {
        onMessageCallback(e)
      }

      const data = JSON.parse(e.data);
      if (data.message === 'Connected') {
        setInterval(() => {
          this.ws.send("torch"); // send a message for torch
        }, 5000)
      }

      if (data.message === 'OK' && data.meta === 'router_data') {
        const { data: routerData } = data;
        const {
          receive: receiveValue,
          transmit: transmitValue,
          network_settings: {
            isp_upstream: ispUpStream,
            isp_downstream: ispDownStream
          }
        } = routerData;
        const { receive, transmit } = calculateCalibrateValues({ receiveValue, transmitValue })
        const { ispUp, ispDown } = calculateISPSpeed({ ispUpStream, ispDownStream })
        reduxStore.dispatch(
          NetworkActions.storeRouterData({
            ...routerData,
            receive,
            transmit,
            ispUp,
            ispDown
          })
        );
      }
    }
  }
}

export default WebSocketService;