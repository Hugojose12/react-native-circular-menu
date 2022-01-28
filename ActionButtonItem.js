import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ActionButtonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(props.active ? 1 : 0),
    };

    this.timeout = null;
  }
  render() {
    const offsetX = this.props.radius * Math.cos(this.props.angle);
    const offsetY = this.props.radius * Math.sin(this.props.angle);

    if(this.props.animationEffect) {
      Animated.timing(this.state.anim, {
        toValue: 1,
        duration: 150 * (this.props.index + 0.5),
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(this.state.anim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    }

    return (
      <Animated.View
        style={[{
          opacity: this.state.anim,
          width: this.props.size,
          height: this.props.size,
          transform: [
            {
              translateY: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetY],
              }) },
            {
              translateX: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetX],
              }) },
            {
              rotate: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [`${this.props.startDegree}deg`, `${this.props.endDegree}deg`],
              }) },
            {
              scale: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }) },
          ]
        }]}
      >
        <TouchableOpacity style={{flex:1}} activeOpacity={this.props.activeOpacity || 0.85} onPress={this.props.onPress}>
          <View
            style={[styles.actionButton,{
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2,
              backgroundColor: this.props.buttonColor,
            }]}
          >
            {this.props.children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

}

ActionButtonItem.propTypes = {
  angle: PropTypes.number,
  radius: PropTypes.number,
  buttonColor: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
};

ActionButtonItem.defaultProps = {
  onPress: () => {},
  startDegree: 0,
  endDegree: 720
};

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
