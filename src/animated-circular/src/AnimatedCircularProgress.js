import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill),
      secondAnimation: new Animated.Value(0),
      thirdAnimation: new Animated.Value(0),
      secondCircularFillAnimation: new Animated.Value(0),
      secondCircularSecondAnimation: new Animated.Value(0),
      secondCircularThirdAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animate();
    this.animateSecond();
    this.animateThird();
    this.secondCircularAnimate();
    this.secondCircularAnimateSecond();
    this.secondCircularAnimateThird();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
    if (prevProps.secondFill !== this.props.secondFill) {
      this.animateSecond();
    }
    if (prevProps.thirdFill !== this.props.thirdFill) {
      this.animateThird();
    }
    if (prevProps.secondCircularFill !== this.props.secondCircularFill) {
      this.secondCircularAnimate();
    }
    if (prevProps.secondCircularSecondFill !== this.props.secondCircularSecondFill) {
      this.secondCircularAnimateSecond();
    }
    if (prevProps.secondCircularThirdFill !== this.props.secondCircularThirdFill) {
      
      this.secondCircularAnimateThird()
    }
  }

  reAnimate(prefill, toVal, dur, ease) {
    this.setState(
      {
        fillAnimation: new Animated.Value(prefill),
        secondAnimation: new Animated.Value(0),
        thirdAnimation: new Animated.Value(0),
        secondCircularFillAnimation: new Animated.Value(0),
        secondCircularSecondAnimation: new Animated.Value(0),
        secondCircularThirdAnimation: new Animated.Value(0),
      },
      () => {
        this.animate(toVal, dur, ease);
        this.animateSecond(toVal, dur, ease);
        this.animateThird(toVal, dur, ease);
        this.secondCircularAnimate(toVal, dur, ease);
        this.secondCircularAnimateSecond(toVal, dur, ease);
        this.secondCircularAnimateThird(toVal, dur, ease);
      }
    );
  }

  animate(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    
    const anim = Animated.timing(this.state.fillAnimation, {
      useNativeDriver,
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  animateSecond(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.secondFill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    
    const anim = Animated.timing(this.state.secondAnimation, {
      useNativeDriver,
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  animateThird(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.thirdFill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    
    const anim = Animated.timing(this.state.thirdAnimation, {
      useNativeDriver,
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  animateColor() {
    if (!this.props.tintColorSecondary) {
      return this.props.tintColor
    }

    const tintAnimation = this.state.fillAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.tintColor, this.props.tintColorSecondary]
    })

    return tintAnimation
  }

  animateSecondColor() {
    const tintAnimation = this.state.secondAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.secondColor, this.props.secondColor]
    })

    return tintAnimation
  }

  animateThirdColor() {
    const tintAnimation = this.state.thirdAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.thirdColor, this.props.thirdColor]
    })

    return tintAnimation
  }
  // **** ANIMATION FOR SECOND CIRCULAR PROGRESS! ****

  secondCircularAnimate(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.secondCircularFill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    
    const anim = Animated.timing(this.state.secondCircularFillAnimation, {
      useNativeDriver,
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  secondCircularAnimateSecond(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.secondCircularSecondFill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    
    const anim = Animated.timing(this.state.secondCircularSecondAnimation, {
      useNativeDriver,
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  secondCircularAnimateThird(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.secondCircularThirdFill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;
    const useNativeDriver = this.props.useNativeDriver;
    
    const anim = Animated.timing(this.state.secondCircularThirdAnimation, {
      useNativeDriver,
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  secondCircularAnimateColor() {
    const tintAnimation = this.state.secondCircularFillAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.secondCircularTintColor, this.props.secondCircularTintColor]
    })

    return tintAnimation
  }

  secondCircularAnimateSecondColor() {
    const tintAnimation = this.state.secondCircularSecondAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.secondCircularSecondColor, this.props.secondCircularSecondColor]
    })

    return tintAnimation
  }

  secondCircularAnimateThirdColor() {
    const tintAnimation = this.state.secondCircularThirdAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [this.props.secondCircularThirdColor, this.props.secondCircularThirdColor]
    })

    return tintAnimation
  }

  render() {
    const { fill, prefill, ...other } = this.props;
    const {
      fillAnimation,
      secondAnimation,
      thirdAnimation,
      secondCircularFillAnimation,
      secondCircularSecondAnimation,
      secondCircularThirdAnimation
    } = this.state;
    return (
      <AnimatedProgress
        {...other}
        fill={fillAnimation}
        tintColor={this.animateColor()}
        secondFill={secondAnimation}
        secondColor={this.animateSecondColor()}
        thirdFill={thirdAnimation}
        thirdColor={this.animateThirdColor()}
        secondCircularFill={secondCircularFillAnimation}
        secondCircularTintColor={this.secondCircularAnimateColor()}
        secondCircularSecondFill={secondCircularSecondAnimation}
        secondCircularSecondColor={this.secondCircularAnimateSecondColor()}
        secondCircularThirdFill={secondCircularThirdAnimation}
        secondCircularThirdColor={this.secondCircularAnimateThirdColor()}
      />
    );
  }
}

AnimatedCircularProgress.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
  useNativeDriver: PropTypes.bool,
};

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
  useNativeDriver: false,
};
