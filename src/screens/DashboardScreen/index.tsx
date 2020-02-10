import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
// import { bindActionCreators } from  'redux';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info'
import { AnimatedCircularProgress } from '../../animated-circular';
import { LATO_BOLD } from '../../assets/fonts';

const DashboardScreen = ({ network, auth }) => {
  console.log("net", network)
  useEffect(() => {
    console.log("NETWORK", network)
    console.log("AUTH", auth)
    const ws = new WebSocket('wss://c.smart.network/appData', '', {
    headers: {
      "Authorization": auth.accessToken,
      "Smart-Network-Router": network.networkList[0].router,
      "Smart-Device-Timezone-IANA": auth.tzIana,
      "Smart-Network-IP": "172.30.7.252",
      "Smart-Network-AppVersion": 9,
      "Smart-Network-UDID": DeviceInfo.getUniqueId(),
    }
  })

  ws.onopen = () => {
    // connection opened
    console.log("CONNECTION OPEN");
  };

  ws.onmessage = (e) => {
    // a message was received
    // console.log("DATA",e.data);
    console.log("PARSED DATA", e.data)
    const data = JSON.parse(e.data);
    if (data.message === 'Connected') {
      setInterval(() => {
        ws.send("torch"); // send a message
      }, 5000)
    }
  };

  }, [])
  
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={220}
        secondCicularSize={264}
        arcSweepAngle={270}
        width={20}
        rotation={0}
        fill={100}
        tintColor="#FFFFFF"
        lineCap='round'
        secondFill={75}
        secondColor="#D9D9D9"
        thirdFill={50}
        thirdColor="#5F72FF"
        secondCircularFill={100}
        secondCircularTintColor="#FFFFFF"
        secondCircularSecondFill={85}
        secondCircularSecondColor="#D9D9D9"
        secondCircularThirdFill={70}
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
                <Text style={styles.currentSpeedDlValue}>102.2</Text>
                <View style={styles.ispCalibrateTitleBox}>
                  <Text style={styles.ispCalibrateTitle}>ISP SPEED</Text>
                </View>
                <View style={styles.rowIspCalibrate}>
                  <Text style={styles.greenValue}>10.3</Text>
                  <Text style={styles.blueValue}>2.4</Text>
                </View>
                <View style={styles.roundWhite} />
              </View>
              <View style={styles.upColumn}>
                <Text style={styles.currentSpeedUpValue}>33.2</Text>
                <View style={styles.ispCalibrateTitleBox}>
                  <Text style={styles.ispCalibrateTitle}>CALIBRATED</Text>
                </View>
                <View style={[styles.rowIspCalibrate, { justifyContent: 'space-evenly' }]}>
                  <Text style={styles.greenValue}>15.0</Text>
                  <Text style={styles.blueValue}>1.4</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(245,245,245)'
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
  },
  upColumn: {
    flexDirection: 'column',
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
    textAlign: 'left'
  },
  rowIspCalibrate: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  greenValue: {
    color: '#4EA169',
    fontSize: 12,
    fontFamily: LATO_BOLD,
    letterSpacing: 0.08
  },
  blueValue: {
    color: '#424FB2',
    fontSize: 12,
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


export default connect(mapStateToProps)(DashboardScreen);
