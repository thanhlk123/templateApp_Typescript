import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CloseIcon from './close.svg';
import Explore from './explore.svg';
import Profile from './profile.svg';
import Promotion from './promotion.svg';
import Tracker from './tracker.svg';
import Activities from './activities.svg';
import Facebook from './facebook.svg';
import Apple from './apple.svg';
import Pin from './pin.svg';
import ArrowLeft from './arrow-left.svg';
import Menu from './menu.svg';
import List from './list.svg';
import Share from './share.svg';
import StarFilled from './icon_star_filled.svg';
import StarOutlined from './icon_star_outlined.svg';
import Star from './star.svg';

const LIST_ICONS = {
  closeIcon: CloseIcon,
  explore: Explore,
  profile: Profile,
  promotion: Promotion,
  tracker: Tracker,
  activities: Activities,
  facebook: Facebook,
  apple: Apple,
  pin: Pin,
  arrowLeft: ArrowLeft,
  menu: Menu,
  list: List,
  starFilled: StarFilled,
  starOutlined: StarOutlined,
  share: Share,
  star: Star,
};

const DEFAULT_COLOR = '#828282';
const SvgIcon = ({ fill, style, buttonStyle, name, onPress }) => {
  const isButton = onPress !== null && onPress !== undefined;

  const Icon = LIST_ICONS[name];
  const height = style?.[0]?.height || 13;
  const width = style?.[0]?.width || 13;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        disabled={!isButton}
        onPress={() => onPress && onPress()}
      >
        <Icon height={height} width={width} fill={fill || DEFAULT_COLOR} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SvgIcon;
