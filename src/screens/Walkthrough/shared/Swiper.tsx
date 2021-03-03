/**
 * Swiper
 * Renders a swipable set of screens passed as children,
 * pagination indicators and a button to swipe through screens
 * or to get out of the flow when the last screen is reached
 */

// import { Pagination } from '@components/index';
import Colors from '@theme/colors';
import React, {Component} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import WalkthroughPagination from './WalkthroughPagination';
export const WindowSize = Dimensions.get('window');
export const ScreenWidth = Math.round(WindowSize.width);

// Detect screen width and height
const {width, height} = Dimensions.get('window');
// const { width } = Dimensions.get('window');
// const height = 500;
interface SwiperInterfaceProps {
  onListenIndex: any;
}

export default class Swiper extends Component<SwiperInterfaceProps> {
  static defaultProps = {
    // Arrange screens horizontally
    horizontal: true,
    // Scroll exactly to the next screen, instead of continous scrolling
    pagingEnabled: true,
    // Hide all scroll indicators
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    // Do not bounce when the end is reached
    bounces: false,
    // Do not scroll to top when the status bar is tapped
    scrollsToTop: false,
    // Remove offscreen child views
    removeClippedSubviews: true,
    // Do not adjust content behind nav-, tab- or toolbars automatically
    automaticallyAdjustContentInsets: false,
    // Fisrt is screen is active
    index: 0,
  };

  state = this.initState(this.props);
  internals: any;
  scrollView: any;
  /**
   * Initialize the state
   */
  initState(props: any) {
    // Get the total number of slides passed as children
    const total = props.children ? props.children.length || 1 : 0,
      // Current index
      index = total > 1 ? Math.min(props.index, total - 1) : 0,
      // Current offset
      offset = width * index;
    const state = {
      total,
      index,
      offset,
      width,
      height,
      pagingIndex: 0,
      swipeLeft: false,
      swipeRight: false,
    };

    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      isScrolling: false,
      offset,
    };

    return state;
  }

  /**
   * Scroll begin handler
   * @param {object} e native event
   */
  onScrollBegin = () => {
    // Update internal isScrolling state
    this.setState({block: false});
    this.internals.isScrolling = true;
  };

  /**
   * Scroll end handler
   * @param {object} e native event
   */
  onScrollEnd = (e: any) => {
    // Update internal isScrolling state
    this.internals.isScrolling = false;

    // Update index
    // When scrolled with .scrollTo() on Android there is no contentOffset
    this.updateIndex(
      e.nativeEvent.contentOffset
        ? e.nativeEvent.contentOffset.x
        : e.nativeEvent.position * this.state.width,
      this.updatePagingIndexAfterEndDrag,
    );
  };

  updatePagingIndexAfterEndDrag = (index: number) => {
    if (index !== this.state.pagingIndex) {
      this.setState({pagingIndex: index});
    }
  };

  /*
   * Drag end handler
   * @param {object} e native event
   */
  onScrollEndDrag = (e: any) => {
    const {
        contentOffset: {x: newOffset},
      } = e.nativeEvent,
      {children} = this.props,
      {index} = this.state,
      {offset} = this.internals;

    // Update internal isScrolling state
    // if swiped right on the last slide
    // or left on the first one
    if (
      offset === newOffset &&
      (index === 0 || (children && index === children.length - 1))
    ) {
      this.internals.isScrolling = false;
    }
  };

  /**
   * Update index after scroll
   * @param {object} offset content offset
   */
  updateIndex = (offset: number, callBack: (arg0: number) => void) => {
    const state = this.state,
      diff = offset - this.internals.offset,
      step = state.width;
    let index = state.index;

    // callBack(parseInt(index + Math.round(diff / step), 10));

    // Do nothing if offset didn't change
    if (!diff) {
      return;
    }

    // Make sure index is always an integer
    index = index + Math.round(diff / step);
    // Update internal offset
    this.internals.offset = offset;
    // Update index in the state
    this.setState({
      index,
      pagingIndex: index,
      offset: offset,
    });

    this.props.onListenIndex(index);
  };

  /**
   * Swipe one slide forward
   */
  swipe = () => {
    // Ignore if already scrolling or if there is less than 2 slides
    if (this.internals.isScrolling || this.state.total < 2) {
      return;
    }

    const state = this.state,
      diff = this.state.index + 1,
      x = diff * state.width,
      y = 0;

    // Call scrollTo on scrollView component to perform the swipe
    this.scrollView && this.scrollView.scrollTo({x, y, animated: true});

    // Update internal scroll state
    this.internals.isScrolling = true;

    // Trigger onScrollEnd manually on android
    if (Platform.OS === 'android') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff,
          },
        });
      });
    }
  };

  /**
   * onScroll to update index paging indicator
   */
  onScrollToUpdatePaging = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let offsetX = event.nativeEvent.contentOffset.x;
    let index = Math.round(offsetX / ScreenWidth);
    this.setState({pagingIndex: index});
  };

  /**
   * Render ScrollView component
   * @param {array} slides to swipe through
   */
  renderScrollView = (pages: any) => {
    return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={this.onScrollToUpdatePaging}
        ref={(component) => {
          this.scrollView = component;
        }}
        {...this.props}
        onScrollBeginDrag={this.onScrollBegin}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}>
        {pages.map((page: React.ReactNode, i: string | number | undefined) => (
          // Render each slide inside a View
          <View style={[styles.fullScreen, styles.slide]} key={i}>
            {page}
          </View>
        ))}
      </ScrollView>
    );
  };

  /**
   * Render the component
   */
  render = ({children} = this.props) => {
    return (
      <View style={[styles.container]}>
        {/* Render screens */}
        {this.renderScrollView(children)}
        {/* Render pagination */}
        <WalkthroughPagination
          style={[styles.pagination]}
          dotsLength={this.state.total}
          // activeDotIndex={this.state.index}
          activeDotIndex={this.state.pagingIndex}
          activeDotColor={Colors.CARIBBEAN_GREEN}
        />
        <View style={styles.dummyView} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  // Set width and height to the screen size
  fullScreen: {
    width: width,
    height: height,
  },
  // Main container
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  // Slide
  slide: {
    backgroundColor: 'transparent',
  },
  // Pagination dot
  dot: {
    backgroundColor: '#DBDFE1',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  // Active dot
  activeDot: {
    width: 25,
    backgroundColor: '#E9781C',
  },
  // Button wrapper
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingStart: 24,
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  dummyView: {
    height: 70,
  },
  pagination: {
    position: 'absolute',
    bottom: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
    height: 10,
  },
});
