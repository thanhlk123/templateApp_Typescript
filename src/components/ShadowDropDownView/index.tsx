import {Constants} from '@constants/Constant';
import Colors from '@theme/colors';
import Fonts from '@theme/fonts';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

const dropHeightDefault = 100;
const heightDefault = 42;
const screenWidth = Constants.MAX_WIDTH;

const Container = styled.View`
  flex-direction: row;
`;

interface TextContainerProps {
  paddingVertical?: number;
  paddingHorizontal?: number;
  backgroundTextColor?: string;
  height?: number;
}

const TextContainer = styled.View<TextContainerProps>`
  width: ${screenWidth - 70}px;
  height: ${(props) => props.height || heightDefault}px;
  border-width: 4px;
  border-color: black;
  border-right-width: 4px;
  border-bottom-width: 4px;
  background-color: ${Colors.WHITE};
  padding-vertical: ${(props) => props.paddingVertical || 0}px;
  padding-horizontal: ${(props) => props.paddingHorizontal || 0}px;
  background-color: ${(props) => props.backgroundTextColor || Colors.WHITE};
  justify-content: center;
`;

const BorderRightContainer = styled.View`
  height: ${heightDefault}px;
`;

const BorderBottomContainer = styled.View`
  margin-top: -0.1px;
  width: 100%;
`;

const Title = styled(Fonts.Poppins900Size20)`
  text-align: center;
`;

const Circle = styled.View`
  margin-top: -1px;
  width: 12px;
  height: 12px;
  border-radius: 90px;
  background-color: ${Colors.BLACK};
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 90px;
  background-color: ${Colors.WHITE};
`;

const DropLine = styled.View<{height?: number}>`
  height: ${(props) => props.height || dropHeightDefault}px;
  background-color: ${Colors.BLACK};
  width: 4px;
`;

const DropView = styled.View`
  align-items: center;
`;

const DropViewContainer = styled.View`
  align-self: center;
`;

const BottomEdge = styled.View<{size?: number; color?: string}>`
  border-top-width: ${(props) => props.size || 8}px;
  border-top-color: ${(props) => props.color || Colors.BLACK};
  border-left-width: ${(props) => props.size || 8}px;
  border-left-color: transparent;
  height: 0;
`;

const RightEdge = styled.View<{size?: number; color?: string}>`
  margin-left: -0.1px;
  border-left-width: ${(props) => props.size || 8}px;
  border-left-color: ${(props) => props.color || Colors.BLACK};
  border-top-width: ${(props) => props.size || 8}px;
  border-top-color: transparent;
  width: 8px;
  height: 100%;
`;

interface ShadowContainerProps {
  height?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  title: string;
  backgroundTextColor?: string;
  shadowColor?: string;
  customStyle?: object;
  dropHeight?: number;
}

const ShadowDropDownView: React.FC<ShadowContainerProps> = ({
  height = heightDefault,
  paddingVertical,
  paddingHorizontal,
  title,
  backgroundTextColor,
  customStyle,
  shadowColor = Colors.BLACK,
  dropHeight = dropHeightDefault,
  ...props
}) => {
  return (
    <DropViewContainer>
      <View style={styles.dropDownContainer}>
        <DropView>
          <DropLine height={dropHeight} />
          <Circle>
            <InnerCircle />
          </Circle>
        </DropView>
        <DropView>
          <DropLine height={dropHeight} />
          <Circle>
            <InnerCircle />
          </Circle>
        </DropView>
      </View>

      <Container {...props} style={customStyle}>
        <View>
          <TextContainer
            height={height}
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}
            backgroundTextColor={backgroundTextColor}>
            <Title>{title}</Title>
          </TextContainer>
          <BorderBottomContainer>
            <BottomEdge />

            <View style={styles.bottomOverlay}>
              <BottomEdge color={shadowColor} size={5} />
            </View>
          </BorderBottomContainer>
        </View>
        <BorderRightContainer />
        <RightEdge />
        <View style={[styles.rightOverlay, {height: height}]}>
          <RightEdge size={5} color={shadowColor} />
        </View>

        <View />
      </Container>
    </DropViewContainer>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -28,
    zIndex: 1,
    paddingLeft: 12,
    paddingRight: 20,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 5,
  },
  rightOverlay: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
});

export default ShadowDropDownView;
