import React from "react";
import styled from "styled-components";
import { View, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";

//接收redux传来的参数
function mapStateToProps(state) {
  return {
    action: state.action,
    text: state.text,
    fontSize: state.fontSize,
    fontWeight: state.fontWeight,
    textSpeed: state.textSpeed,
  };
}

//向redux提交参数
function mapDispatchToProps(dispatch) {
  return {};
}

//获取屏幕宽高
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

class TextWay extends React.Component {
  state = {
    x: new Animated.Value(-screenWidth / 2),
    text: "自身state中设置的Loding",
    width: 0,
    time: 3000,
  };

  //弹幕的布局发生改变时调用,每一帧都会调用,因为在不停渲染
  layout = (e) => {
    if (this.props.textSpeed) {
      this.setState({
        width: e.layout.width,
        time: (e.layout.width + screenWidth) / this.props.textSpeed,
      });
    } else {
      this.setState({
        width: e.layout.width,
      });
    }
  };

  //弹幕滚动动画
  startRoll() {
    Animated.sequence([
      Animated.timing(this.state.x, {
        toValue: screenWidth / 2 + this.state.width / 2,
        duration: this.state.time,
      }),
      Animated.timing(this.state.x, {
        toValue: -screenWidth / 2 - this.state.width / 2,
        duration: 0,
      }),
    ]).start(() => this.startRoll());
  }

  //初次渲染完毕弹幕开始滚动
  componentDidMount() {
    this.startRoll();
  }

  componentDidUpdate() {}

  render() {
    return (
      <Container>
        <TextWrap>
          <AnimatedText
            onLayout={({ nativeEvent: e }) => this.layout(e)}
            style={{
              left: this.state.x,
              fontSize: this.props.fontSize,
              fontWeight: this.props.fontWeight,
            }}
          >
            {this.props.text}
          </AnimatedText>
        </TextWrap>
        <View style={{ top: 100 }}>
          <DebugText>动作:{this.props.action}</DebugText>
          <DebugText>文字大小:{this.props.fontSize}</DebugText>
          <DebugText>文字粗细:{this.props.fontWeight}</DebugText>
          <DebugText>文本速度:{this.props.textSpeed}</DebugText>
          <DebugText>文本宽度:{this.state.width}</DebugText>
          <DebugText>所需时间:{this.state.time}</DebugText>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextWay);

//文本固定样式
const TextToshot = styled.Text`
  text-align: center;
  color: white;
`;
const AnimatedText = Animated.createAnimatedComponent(TextToshot);

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

//滚动文字容器,最大宽度50000,决定了最长文本宽度
const TextWrap = styled.View`
  width: 50000px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DebugText = styled.Text`
  color: white;
`;
