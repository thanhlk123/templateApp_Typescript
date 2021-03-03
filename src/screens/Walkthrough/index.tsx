import ShadowDropDownView from '@components/ShadowDropDownView/index';
import Colors from '@theme/colors';
import Fonts from '@theme/fonts';
import React from 'react';
import styled from 'styled-components/native';
import Swiper from './shared/Swiper';
import i18n from '@locales/index';

const WalkthroughItems = [
  {
    index: 1,
    title: i18n.t('walkthrough.buyTickets'),
    imageSource: require('@assets/images/wt_buy_ticket.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id condimentum sem, vitae rhoncus diam. Integer vitae magna id urna scelerisque scelerisque at eget dui.',
  },
  {
    index: 2,
    title: i18n.t('walkthrough.freshOffThePress'),
    imageSource: require('@assets/images/wt_news.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id condimentum sem, vitae rhoncus diam. Integer vitae magna id urna scelerisque scelerisque at eget dui.',
  },
  {
    index: 3,
    title: i18n.t('walkthrough.findEvents'),
    imageSource: require('@assets/images/wt_fan_meet.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id condimentum sem, vitae rhoncus diam. Integer vitae magna id urna scelerisque scelerisque at eget dui.',
  },
  {
    index: 4,
    title: i18n.t('walkthrough.expressYourself'),
    imageSource: require('@assets/images/wt_express.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id condimentum sem, vitae rhoncus diam. Integer vitae magna id urna scelerisque scelerisque at eget dui.',
  },
];

const Container = styled.View`
  background-color: ${Colors.WHITE};
  flex: 1;
`;

const BackgroundImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 150px;
  background-color: ${Colors.ROYAL_BLUE};
`;

const Image = styled.Image`
  margin-top: 8px;
`;

const Description = styled(Fonts.PublicSans600Size14)`
  color: ${Colors.WHITE};
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 24px;
  text-align: center;
`;

const SlideView = styled.View`
  flex: 1;
`;

const DoneContainer = styled.View`
  position: absolute;
  bottom: 30px;
  width: 100%;
  align-items: center;
`;

const Done = styled(Fonts.PublicSans800Size16)`
  color: ${Colors.WHITE};
`;

const DoneButton = styled.TouchableOpacity`
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

class Walkthrough extends React.Component<{}, {isFinish: boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      isFinish: false,
    };
  }

  onListenIndex = (index) => {
    console.log(index);
    if (index >= 3) {
      this.setState({
        isFinish: true,
      });
    }
  };

  render() {
    return (
      <Container>
        <Swiper onListenIndex={this.onListenIndex}>
          {WalkthroughItems.map((item, index) => {
            return (
              <SlideView key={`walkthrough${index}`}>
                <BackgroundImageContainer>
                  <ShadowDropDownView
                    title={item.title}
                    shadowColor={Colors.SELECTIVE_YELLOW}
                    height={42}
                    dropHeight={100}
                  />
                  <Image source={item.imageSource} />
                  <Description>{item.description}</Description>
                </BackgroundImageContainer>
              </SlideView>
            );
          })}
        </Swiper>
        <DoneContainer>
          {this.state.isFinish && (
            <DoneButton onPress={() => {}}>
              <Done>Done</Done>
            </DoneButton>
          )}
        </DoneContainer>
      </Container>
    );
  }
}

export default Walkthrough;
