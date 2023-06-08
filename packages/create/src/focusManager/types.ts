import type {
    ScrollViewProps as RNScrollViewProps,
    StyleProp,
    ViewProps as RNViewProps,
    PressableProps as RNPressableProps,
    TouchableOpacityProps as RNTouchableOpacityProps,
    ViewStyle,
    ScrollView,
    ColorValue,
    View as RNView,
} from 'react-native';
import type { FlashListProps as FLProps, ListRenderItemInfo } from '@flexn/shopify-flash-list';
import FocusModel from './model/FocusModel';
import View from './model/view';
import Screen from './model/screen';

export type ClosestNodeOutput = {
    match1: number;
    match1Model?: View;
    match2: number;
    match2Model?: View;
    match3: number;
    match3Model?: View;
};

export type ForbiddenFocusDirections =
    | 'down'
    | 'up'
    | 'left'
    | 'right'
    | 'swipeDown'
    | 'swipeUp'
    | 'swipeLeft'
    | 'swipeRight';

export type WindowAlignment = 'both-edge' | 'low-edge';
export type ScreenStates = 'background' | 'foreground';
export type FocusContext = FocusModel;

const ALIGNMENT_LOW_EDGE = 'low-edge';

export type AnimatorScale = {
    type: 'scale';
    focus: {
        scale?: number;
        duration?: number;
    };
};

export type AnimatorScaleWithBorder = {
    type: 'scale_with_border';
    focus: {
        scale?: number;
        duration?: number;
        borderWidth: number;
        borderColor: ColorValue;
        borderRadius?: number;
    };
};

export type AnimatorBorder = {
    type: 'border';
    focus: {
        borderWidth: number;
        borderColor: string;
        borderRadius?: number;
        duration?: number;
    };
};

export type AnimatorBackground = {
    type: 'background';
    focus: {
        backgroundColor: ColorValue;
        duration?: number;
    };
};

export type Animator = AnimatorScale | AnimatorBorder | AnimatorScaleWithBorder | AnimatorBackground;

export type PressableFocusOptions = {
    forbiddenFocusDirections?: ForbiddenFocusDirections[];
    animator?: Animator;
    focusKey?: string;
    hasInitialFocus?: boolean;
    nextFocusLeft?: string | string[];
    nextFocusRight?: string | string[];
    nextFocusUp?: string | string[];
    nextFocusDown?: string | string[];
    group?: string;
};

export type ScreenFocusOptions = {
    forbiddenFocusDirections?: ForbiddenFocusDirections[];
    focusKey?: string;
    verticalWindowAlignment?: typeof ALIGNMENT_LOW_EDGE;
    horizontalWindowAlignment?: typeof ALIGNMENT_LOW_EDGE;
    horizontalViewportOffset?: number;
    verticalViewportOffset?: number;
    nextFocusLeft?: string | string[];
    nextFocusRight?: string | string[];
    nextFocusUp?: string | string[];
    nextFocusDown?: string | string[];
    screenState?: ScreenStates;
    screenOrder?: number;
    stealFocus?: boolean;
    group?: string;
};

export type RecyclableListFocusOptions = {
    forbiddenFocusDirections?: ForbiddenFocusDirections[];
    nextFocusLeft?: string | string[];
    nextFocusRight?: string | string[];
    nextFocusUp?: string | string[];
    nextFocusDown?: string | string[];
};

export interface ViewProps extends RNViewProps {
    focusOptions?: {
        group?: string;
        focusKey?: string;
        nextFocusLeft?: string | string[];
        nextFocusRight?: string | string[];
        nextFocusUp?: string | string[];
        nextFocusDown?: string | string[];
    };
    focusContext?: FocusContext;
    focusRepeatContext?: CreateListRenderItemInfo<any>['focusRepeatContext'];
    ref?: React.ForwardedRef<RNView> | React.MutableRefObject<RNView>;
}

export interface PressableProps extends RNPressableProps {
    focus?: boolean;
    focusOptions?: PressableFocusOptions;
    focusContext?: FocusContext;
    focusRepeatContext?: CreateListRenderItemInfo<any>['focusRepeatContext'];
    onBlur?: () => void;
    onFocus?: () => void;
    className?: string;
    style?: ViewProps['style'];
}

export interface TouchableOpacityProps extends RNTouchableOpacityProps {
    focusOptions?: PressableFocusOptions;
    focusContext?: FocusContext;
    focusRepeatContext?: CreateListRenderItemInfo<any>['focusRepeatContext'];
    onBlur?: () => void;
    onFocus?: () => void;
    className?: string;
    dataSet?: any;
}

export interface ScrollViewProps extends RNScrollViewProps {
    ref?: React.MutableRefObject<ScrollView>;
    focusContext?: FocusContext;
    focusOptions?: RecyclableListFocusOptions;
}

export interface ScreenProps {
    children?: React.ReactNode | React.ReactNode[];
    style?: StyleProp<ViewStyle>;
    onBlur?: () => void;
    onFocus?: () => void;
    focusOptions?: ScreenFocusOptions;
}

export interface FlashListProps<Item> extends FLProps<Item> {
    focusContext?: FocusModel;
    horizontal?: boolean;
    scrollViewProps?: RNScrollViewProps;
    style?: StyleProp<ViewStyle>;
    focusOptions?: RecyclableListFocusOptions;
    initialRenderIndex?: number;
    renderItem: CreateListRenderItem<Item>;
    type: 'grid' | 'row';
    onBlur?: () => void;
    onFocus?: () => void;
}

export interface CellContainerProps extends ViewProps {
    index: number;
}

export type CreateListRenderItemInfo<Item> = {
    focusRepeatContext?: {
        focusContext: any;
        index: number;
    };
} & ListRenderItemInfo<Item>;

export type CreateListRenderItem<Item> = (info: CreateListRenderItemInfo<Item>) => React.ReactElement | null;

export type ScreenType = Screen;
export type ViewType = View;
