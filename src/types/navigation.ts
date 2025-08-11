import { NavigationState, ParamListBase, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface TabPressEvent {
  type: string;
  target?: string;
  canPreventDefault?: boolean;
  defaultPrevented?: boolean;
  preventDefault?: () => void;
}

export interface TabBarState extends NavigationState<ParamListBase> {
  routes: Array<{
    key: string;
    name: string;
    params?: object;
  }>;
  index: number;
}

export interface TabBarDescriptor {
  options: {
    title?: string;
    tabBarLabel?: string;
    tabBarIcon?: ({
      color,
      size,
      focused,
    }: {
      color: string;
      size: number;
      focused: boolean;
    }) => React.ReactNode;
    tabBarAccessibilityLabel?: string;
    tabBarTestID?: string;
  };
  navigation: BottomTabNavigationProp<ParamListBase> & {
    emit: (event: { type: string; target?: string; canPreventDefault?: boolean }) => TabPressEvent;
  };
  route: RouteProp<ParamListBase>;
}

export interface TabBarProps {
  state: TabBarState;
  descriptors: { [key: string]: TabBarDescriptor };
  navigation: BottomTabNavigationProp<ParamListBase> & {
    emit: (event: { type: string; target?: string; canPreventDefault?: boolean }) => TabPressEvent;
  };
}

export interface LazyScreenProps {
  name: string;
  component: React.ComponentType<unknown>;
  fallback?: React.ComponentType<unknown>;
}
