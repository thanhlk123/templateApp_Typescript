import IconForwardArrow from '@assets/images/icon_walkthrough_back.svg';
import Colors from '@theme/colors';
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
import styled from 'styled-components/native';
export const WindowSize = Dimensions.get('window');
export const ScreenWidth = Math.round(WindowSize.width);

const Container = styled.View`
  height: 10px;
  width: ${ScreenWidth}px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Dot = styled(Animated.View)`
  width: 8px;
  height: 8px;
  background-color: ${Colors.WHITE};
  border-radius: 90px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

interface PaginationProps {
  style?: Object;
  activeDotColor?: string;
  inactiveDotColor?: string;
  dotsLength: number;
  activeDotIndex: number;
}

const WalkthroughPagination: React.FC<PaginationProps> = ({
  style,
  dotsLength,
  activeDotIndex,
  inactiveDotColor = Colors.WHITE,
  activeDotColor = Colors.CARIBBEAN_GREEN,
}) => {
  const arrayDots = Array(dotsLength).fill('');

  return (
    <Container style={style}>
      {arrayDots.map((item: any, index: number) => {
        return (
          <DotView
            key={index}
            index={index}
            activeDotIndex={activeDotIndex}
            activeDotColor={activeDotColor}
            inactiveDotColor={inactiveDotColor}
          />
        );
      })}
    </Container>
  );
};

interface DotViewProps {
  index: number;
  activeDotIndex: number;
  activeDotColor?: string;
  inactiveDotColor?: string;
}

const DotView: React.FC<DotViewProps> = ({
  index,
  activeDotIndex,
  inactiveDotColor = Colors.WHITE,
  activeDotColor = Colors.CARIBBEAN_GREEN,
}) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: index === activeDotIndex ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeDotIndex, anim, index]);

  const interpolatedWidthAnim = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 40],
  });

  const interpolatedColorAnim = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveDotColor, activeDotColor],
  });

  return (
    <Dot
      style={{
        width: interpolatedWidthAnim,
        height: interpolatedWidthAnim,
        backgroundColor: interpolatedColorAnim,
      }}>
      {index === activeDotIndex && <IconForwardArrow />}
    </Dot>
  );
};

export default React.memo(WalkthroughPagination);
