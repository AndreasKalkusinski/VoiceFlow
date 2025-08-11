import { NavigationState, ParamListBase, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

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
  };
  navigation: BottomTabNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}

export interface TabBarProps {
  state: TabBarState;
  descriptors: { [key: string]: TabBarDescriptor };
  navigation: BottomTabNavigationProp<ParamListBase>;
}

export interface LazyScreenProps {
  name: string;
  component: React.ComponentType<unknown>;
  fallback?: React.ComponentType<unknown>;
}
