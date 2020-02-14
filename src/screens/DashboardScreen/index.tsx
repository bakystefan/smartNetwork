// const identities = [
//   {
//     _id: "BORKO",
//     _rev: "261-d5b91d81c8b64c11f5dded28de305264",
//     smart_router: "40464883-6ac2-416e-b31f-8d92b61c3c33",
//     smart_user: "2a7b9103-3b1f-4342-9f71-1aa152f31976",
//     contact_ref: "",
//     this_is_me: "0",
//     pic_ref: "https://s3-us-west-2.amazonaws.com/smart-avatars/2a7b9103-3b1f-4342-9f71-1aa152f31976/40464883-6ac2-416e-b31f-8d92b61c3c33/39060001-D845-46E7-A266-54A893ABAE44/avatar.png",
//     devices: [
//       {
//         MAC: "FC:2A:9C:99:06:9A",
//         MAC_info: "Unknown",
//         ip: "192.168.88.231",
//         hostname: "PavelPovsiPhone",
//         name: "PavelPovsiPhone",
//         blocked: false,
//         source: "show_all",
//         rx: 400,
//         tx: 300
//       },
//       {
//         MAC: "FC:2A:9C:99:06:9A",
//         MAC_info: "Unknown",
//         ip: "192.168.88.231",
//         hostname: "PavelPovsiPhone",
//         name: "PavelPovsiPhone",
//         blocked: false,
//         source: "show_all",
//         rx: 700,
//         tx: 200
//       },
//       {
//         MAC: "FC:2A:9C:99:06:9A",
//         MAC_info: "Unknown",
//         ip: "192.168.88.231",
//         hostname: "PavelPovsiPhone",
//         name: "LUKICA",
//         blocked: false,
//         source: "show_all",
//         rx: 800,
//         tx: 600
//       },
//     ],
//     rx: 1900,
//     tx: 1100,
//     contact: "",
//     default: false,
//     name: "Pavel Identity",
//     name_key: "pavel_identity",
//     mtime: 1581436901363,
//   },
//   {
//     _id: "LUKA",
//     _rev: "261-d5b91d81c8b64c11f5dded28de305264",
//     smart_router: "40464883-6ac2-416e-b31f-8d92b61c3c33",
//     smart_user: "2a7b9103-3b1f-4342-9f71-1aa152f31976",
//     contact_ref: "",
//     this_is_me: "0",
//     pic_ref: "https://s3-us-west-2.amazonaws.com/smart-avatars/2a7b9103-3b1f-4342-9f71-1aa152f31976/40464883-6ac2-416e-b31f-8d92b61c3c33/39060001-D845-46E7-A266-54A893ABAE44/avatar.png",
//     devices: [
//       {
//         MAC: "FC:2A:9C:99:06:9A",
//         MAC_info: "Unknown",
//         ip: "192.168.88.231",
//         hostname: "PavelPovsiPhone",
//         name: "GOLMAN",
//         blocked: false,
//         source: "show_all",
//         rx: 400,
//         tx: 200
//       },
//       {
//         MAC: "FC:2A:9C:99:06:9A",
//         MAC_info: "Unknown",
//         ip: "192.168.88.231",
//         hostname: "PavelPovsiPhone",
//         name: "JOVa",
//         blocked: false,
//         source: "show_all",
//         rx: 1000,
//         tx: 200
//       },
//     ],
//     rx: 1400,
//     tx: 400,
//     contact: "",
//     default: false,
//     name: "Pavel Identity",
//     name_key: "pavel_identity",
//     mtime: 1581436901363,
//   }
// ]

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
// import { bindActionCreators } from  'redux';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import NetworkActions from '../../redux/reducers/network';
import { AnimatedCircularProgress } from '../../animated-circular';
import { LATO_BOLD } from '../../assets/fonts';
import WebSocketService from '../../services/websocket';
import { calculatePercentageOfNumber } from '../../utils/calculatePrecentOfNumber';
import { calculateBitsToMbits } from '../../utils/calculateBitstToMbits';
import TopUserContainer from '../../components/topUserContainer';

const reduceDeviceDefault = { rx: 0, tx: 0, greatestRx: { rx: 0, }, greatestTx: { tx: 0 }};

let greatestIdentity = { biggestNumber: 0, typeOf: null, identity: null };

const DashboardScreen = ({ network, auth }) => {
  const [currentSpeed, setCurrentSpeed] = useState({ rx: 0, tx: 0 });
  const [topUser, setTopUser] = useState(null);

  const onMessage = (e: any) => {
    const data = JSON.parse(e.data);
    if (data.message === 'OK' && data.meta === 'torch') {
      const { data: { rx, tx, identities } } = data;
      const identitiesTxRx = identities.map((item: any) => {
        const {rx, tx, greatestRx, greatestTx} = item.devices.reduce((acc, current) => {
          const { greatestTx, greatestRx } = acc;
          const { tx: currTx = 0, rx: currRx = 0 } = current;
          return {
            greatestRx: greatestRx.rx > currRx ? greatestRx : current,
            greatestTx: greatestTx.tx > currTx ? greatestTx : current,
            rx: acc.rx + currRx,
            tx: acc.tx + currTx
          };
        }, reduceDeviceDefault)
        return {
          ...item,
          greatestRx,
          greatestTx,
          rx,
          tx
        }
      }) || [];
      const { biggestNumber, typeOf, identity } = identitiesTxRx.reduce((acc, current) => {
        const checkWithThis = current.tx > current.rx ? current.tx : current.rx;
        if (acc.biggestNumber > checkWithThis) {
          return acc;
        } 
        return {
          biggestNumber: checkWithThis,
          typeOf: current.greatestTx.tx > current.greatestRx.rx ? current.greatestTx : current.greatestRx,
          identity: current
        }

      }, greatestIdentity);
      const { pic_ref } = identity;
      const { name } = typeOf;
      const topUser = biggestNumber && { pic_ref, name } || null;
      setTopUser(topUser);
      setCurrentSpeed({ rx, tx })
    }
  }

  const setCurrentNetwork = (url, networkRouter, auth) => {
    const ws = new WebSocketService().createWss(url, {
      headers: {
        "Authorization": auth.accessToken,
        "Smart-Network-Router": networkRouter,
        "Smart-Device-Timezone-IANA": auth.tzIana,
        "Smart-Network-IP": "172.30.7.252",
        "Smart-Network-AppVersion": 9,
        "Smart-Network-UDID": DeviceInfo.getUniqueId(),
      }
    }, onMessage);
  }

  useEffect(() => {
    setCurrentNetwork('wss://c.smart.network/appData', network.networkList[0].router, auth)
  }, [])
  
  const { routerData: { ispUp, ispDown, receive, transmit } } = network;
  const { rx, tx } = currentSpeed;
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedCircularProgress
        size={220}
        secondCicularSize={268}
        arcSweepAngle={270}
        width={21}
        rotation={0}
        fill={ispUp}
        tintColor="#FFFFFF"
        lineCap='round'
        secondFill={Math.round(calculatePercentageOfNumber(transmit, ispUp))}
        secondColor="#D9D9D9"
        thirdFill={Math.round(calculatePercentageOfNumber(calculateBitsToMbits(tx), ispUp))}
        thirdColor="#5F72FF"
        secondCircularFill={ispDown}
        secondCircularTintColor="#FFFFFF"
        secondCircularSecondFill={Math.round(calculatePercentageOfNumber(receive, ispDown))}
        secondCircularSecondColor="#D9D9D9"
        secondCircularThirdFill={Math.round(calculatePercentageOfNumber(calculateBitsToMbits(rx), ispUp))}
        secondCircularThirdColor="#6EE294"
        duration={1200}
        showArrow
      >
        {fill => (
          <View style={styles.innerContainer}>
            <View style={styles.currentSpeedBox}>
              <Text style={styles.currentSpeedText}>CURRENT SPEED</Text>
            </View>
            <View style={styles.rowBox}>
              <View style={styles.downColumn}>
                <Animatable.Text
                  animation="pulse"
                  easing="ease-out-quint"
                  iterationCount="infinite"
                  iterationDelay={5000}
                  style={styles.currentSpeedDlValue}
                >
                  {calculateBitsToMbits(rx) === 0 ? '0.0' : calculateBitsToMbits(rx)}
                </Animatable.Text>
                <View style={styles.ispCalibrateTitleBox}>
                  <Text style={styles.ispCalibrateTitle}>ISP SPEED</Text>
                </View>
                <View style={styles.rowIspCalibrate}>
                  <Text style={styles.greenValue}>{ispDown === 100 ? '100.0' : ispDown}</Text>
                  <Text style={styles.blueValue}>{ispUp === 100 ? '100.0' : ispUp}</Text>
                </View>
                <View style={styles.roundWhite} />
              </View>
              <View style={styles.upColumn}>
                <Animatable.Text
                    animation="pulse"
                    easing="ease-out-quint"
                    iterationCount="infinite"
                    iterationDelay={5000}
                    style={styles.currentSpeedUpValue}
                  >
                  {calculateBitsToMbits(tx) === 0 ? '0.0' : calculateBitsToMbits(tx)}
                </Animatable.Text>
                <View style={styles.ispCalibrateTitleBox}>
                  <Text style={styles.ispCalibrateTitle}>CALIBRATED</Text>
                </View>
                <View style={[styles.rowIspCalibrate, { justifyContent: 'space-evenly' }]}>
                  <Text style={styles.greenValue}>{receive}</Text>
                  <Text style={styles.blueValue}>{transmit}</Text>
                </View>
                <View style={styles.roundGray} />
              </View>
            </View>
            <View style={styles.unitMbitBox}>
              <Text style={styles.unitMbitText}>Unit: Mbit</Text>
            </View>
          </View>
        )}
      </AnimatedCircularProgress>
      </View>
      <View style={{width: '100%', flex: 1 }}>
        <TopUserContainer
          topUser={topUser}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(245,245,245)',
    paddingTop: 50
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 140,
    flex: 1,
  },
  currentSpeedBox: {
    paddingTop: 30
  },
  downColumn: {
    flexDirection: 'column',
    flex: 1
  },
  upColumn: {
    flexDirection: 'column',
    flex: 1
  },
  currentSpeedText: {
    color: '#929292',
    fontSize: 12,
    letterSpacing: 0.08,
    lineHeight: 13,
    textAlign: 'center',
    fontFamily: LATO_BOLD
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  currentSpeedDlValue: {
    color: '#4EA169',
    textAlign: 'center',
    fontSize: 19,
    fontFamily: LATO_BOLD
  },
  currentSpeedUpValue: {
    color: '#424FB2',
    textAlign: 'center',
    fontSize: 19,
    fontFamily: LATO_BOLD
  },
  ispCalibrateTitleBox: {
    marginTop: 20,
    marginBottom: 5
  },
  ispCalibrateTitle: {
    color: '#929292',
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 0.07,
    fontFamily: LATO_BOLD,
    textAlign: 'center'
  },
  rowIspCalibrate: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  greenValue: {
    color: '#4EA169',
    fontSize: 11,
    fontFamily: LATO_BOLD,
    letterSpacing: 0.08
  },
  blueValue: {
    color: '#424FB2',
    fontSize: 11,
    fontFamily: LATO_BOLD,
    letterSpacing: 0.08
  },
  roundWhite: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  roundGray: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D9D9D9',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  unitMbitBox: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  unitMbitText: {
    color: '#929292',
    fontSize: 12,
    fontFamily: LATO_BOLD
  }
});

const mapStateToProps = ({ network, auth }) => ({ network, auth });

const mapDispatchToProps = (dispatch: any) => ({
  storeRouterData: (routerData: any) => dispatch(NetworkActions.storeRouterData(routerData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
