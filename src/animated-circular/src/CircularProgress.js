import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text, Image } from 'react-native';
import { Svg, Path, G, Line } from 'react-native-svg';
import { LATO_REGULAR } from '../../assets/fonts';

export default class CircularProgress extends React.PureComponent {
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  circlePath(x, y, radius, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      secondCicularSize,
      width,
      backgroundWidth,
      tintColor,
      secondColor,
      thirdColor,
      backgroundColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
      secondFill = 0,
      thirdFill = 0,
      children,
      childrenContainerStyle,
      padding,
      renderCap,
      dashedBackground,
      secondCircularFill,
      secondCircularSecondFill,
      secondCircularThirdFill,
      secondCircularTintColor,
      secondCircularSecondColor,
      secondCircularThirdColor,
      showArrow = false
    } = this.props;

    const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;
    const sizeWithPadding = size / 2 + padding / 2;
    const radius = size / 2 - maxWidthCircle / 2 - padding / 2;

    const currentFillAngle = (arcSweepAngle * this.clampFill(fill)) / 100;
    const secondFillAngle = (arcSweepAngle * this.clampFill(secondFill) / 100);
    const thirdFillAngle = (arcSweepAngle * this.clampFill(thirdFill) / 100);
    const circlePath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      0,
      currentFillAngle
    );

    const secondPath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      0,
      secondFillAngle
    );

    const thirdPath = this.circlePath(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      0,
      thirdFillAngle
    );

    const coordinate = this.polarToCartesian(
      sizeWithPadding,
      sizeWithPadding,
      radius,
      currentFillAngle
    );
    const cap = this.props.renderCap ? this.props.renderCap({ center: coordinate }) : null;

    const offset = size - maxWidthCircle * 2;

    // second circle
    const sizeWithPaddingSecond = secondCicularSize / 2 + padding / 2;
    const radiusSecond = secondCicularSize / 2 - maxWidthCircle / 2 - padding / 2;
    const currentFillAngleSecondCircular = (arcSweepAngle * this.clampFill(secondCircularFill)) / 100;
    const secondFillAngleSecondCircular = (arcSweepAngle * this.clampFill(secondCircularSecondFill) / 100);
    const thirdFillAngleSecondCircular = (arcSweepAngle * this.clampFill(secondCircularThirdFill) / 100);

    const circlePathSecond = this.circlePath(
      sizeWithPaddingSecond,
      sizeWithPaddingSecond,
      radiusSecond,
      0,
      currentFillAngleSecondCircular
    );

    const secondPathSecond = this.circlePath(
      sizeWithPaddingSecond,
      sizeWithPaddingSecond,
      radiusSecond,
      0,
      secondFillAngleSecondCircular
    );

    const thirdPathSecond = this.circlePath(
      sizeWithPaddingSecond,
      sizeWithPaddingSecond,
      radiusSecond,
      0,
      thirdFillAngleSecondCircular
    );

    const localChildrenContainerStyle = {
      ...{
        position: 'absolute',
        left: maxWidthCircle + padding / 2,
        top: maxWidthCircle + padding / 2,
        width: offset,
        height: offset,
        borderRadius: offset / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      ...childrenContainerStyle,
    }
      
    return (
      <Fragment>
        <View style={style}>
          <View
              style={{
                position: 'absolute',
                right: size  / 2,
                backgroundColor: '#FAFAFA',
                borderWidth: 1,
                borderColor: 'white',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: 22,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
            <Text
              style={{
                textAlign: 'center',
                color: '#666666',
                fontFamily: LATO_REGULAR,
                fontSize: 12
              }}
            >
              UP
            </Text>
          </View>
          <Svg width={size + padding} height={size + padding}>
            <G rotation={rotation} originX={(size + padding) / 2} originY={(size + padding) / 2}>
              {fill > 0 && (
                <Path
                  d={circlePath}
                  stroke={tintColor}
                  strokeWidth={width + 1}
                  strokeLinecap={lineCap}
                  fill="transparent"
                />
              )}
              {fill > 0 && (
                <Path
                  d={secondPath}
                  stroke={secondColor}
                  strokeWidth={width}
                  strokeLinecap={lineCap}
                  fill="transparent"
                />
              )}
              {fill > 0 && (
                <Path
                  d={thirdPath}
                  stroke={thirdColor}
                  strokeWidth={width}
                  strokeLinecap={lineCap}
                  fill="transparent"
                />
              )}
              {showArrow && (
                <>
                  <Line
                    x1="110"
                    y1="14"
                    x2="110"
                    y2="7"
                    stroke="black"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                  <Line
                    x1="115"
                    y1="11"
                    x2="110"
                    y2="5"
                    stroke="black"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                  <Line
                    x1="110"
                    y1="5"
                    x2="105"
                    y2="11"
                    stroke="black"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                </>
              )}
            </G>
          </Svg>
          {children && <View style={localChildrenContainerStyle}>{children(fill)}</View>}
        </View>
        <View style={{ position: 'absolute' }}>
          <View
            style={{
              position: 'absolute',
              right: secondCicularSize  / 2,
              backgroundColor: '#FAFAFA',
              borderWidth: 1,
              borderColor: 'white',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              height: 22,
              width: 45,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#666666',
                fontFamily: LATO_REGULAR,
                fontSize: 12
              }}
            >
              DL
            </Text>
          </View>
          <Svg width={secondCicularSize + padding} height={secondCicularSize + padding}>
            <G rotation={rotation} originX={(secondCicularSize + padding) / 2} originY={(secondCicularSize + padding) / 2}>
              {fill > 0 && (
                <Path
                  d={circlePathSecond}
                  stroke={secondCircularTintColor}
                  strokeWidth={width + 1}
                  strokeLinecap={lineCap}
                  fill="transparent"
                />
              )}
              {fill > 0 && (
                <Path
                  d={secondPathSecond}
                  stroke={secondCircularSecondColor}
                  strokeWidth={width}
                  strokeLinecap={lineCap}
                  fill="transparent"
                />
              )}
              {fill > 0 && (
                <Path
                  d={thirdPathSecond}
                  stroke={secondCircularThirdColor}
                  strokeWidth={width}
                  strokeLinecap={lineCap}
                  fill="transparent"
                />
              )}
              {
                showArrow && (
                  <>
                  <Line
                    x1="134"
                    y1="14"
                    x2="134"
                    y2="6.5"
                    stroke="black"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                  <Line
                    x1="129"
                    y1="10"
                    x2="134"
                    y2="15.5"
                    stroke="black"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                  <Line
                    x1="134"
                    y1="15.5"
                    x2="139"
                    y2="10"
                    stroke="black"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                  </>
              )}
            </G>
          </Svg>
          {/* {children && <View style={localChildrenContainerStyle}>{children(fill)}</View>} */}
        </View>
      </Fragment>
    );
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func,
  childrenContainerStyle: ViewPropTypes.style,
  padding: PropTypes.number,
  renderCap: PropTypes.func,
  dashedBackground: PropTypes.object,
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360,
  padding: 0,
  dashedBackground: { width: 0, gap: 0 },
};
