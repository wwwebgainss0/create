import { Dimensions } from 'react-native';
import { DIRECTION_VERTICAL, CUTOFF_SIZE } from './constants';
import Logger from './model/logger';
import AbstractFocusModel from './model/AbstractFocusModel';

const windowWidth = Dimensions.get('window').width;

const intersects = (guideLine: number, sizeOfCurrent: number, startOfNext: number, endOfNext: number) => {
    const a1 = guideLine - sizeOfCurrent * 0.5;
    const a2 = guideLine + sizeOfCurrent * 0.5;

    return (
        (a1 >= startOfNext && a1 <= endOfNext) ||
        (a2 >= startOfNext && a2 <= endOfNext) ||
        (a1 <= startOfNext && a2 >= endOfNext)
    );
};

const intersectsOffset = (guideLine: number, startOfNext: number, endOfNext: number) =>
    Math.abs(guideLine - Math.round((startOfNext + endOfNext) / 2));

const nextIsVisible = (nextMax: number, direction: string) => {
    if (DIRECTION_VERTICAL.includes(direction)) {
        return nextMax > 0 && nextMax <= windowWidth;
    }

    return true;
};

const isInOneLine = (direction: string, nextCls: AbstractFocusModel, currentFocus: AbstractFocusModel) => {
    const currentLayout = currentFocus.getLayout();
    const nextLayout = nextCls.getLayout();

    if (nextCls.getChildren().length > 0) {
        return false;
    }

    if (DIRECTION_VERTICAL.includes(direction)) {
        const diff = Math.abs(nextLayout.yMin - currentLayout.yMin);
        return diff <= 20;
    }

    const diff = Math.abs(nextLayout.xMin - currentLayout.xMin);

    return diff <= 20;
};

const findFirstFocusableInGroup = (cls: AbstractFocusModel): AbstractFocusModel | null | undefined => {
    for (let index = 0; index < cls.getChildren().length; index++) {
        const ch: AbstractFocusModel = cls.getChildren()[index];
        if (ch.isFocusable()) {
            return ch;
        }

        const next = findFirstFocusableInGroup(ch);

        if (next?.isFocusable()) {
            return next;
        }
    }

    if (cls.isFocusable()) {
        return cls;
    }

    return null;
};

const closestDist = (current: AbstractFocusModel, next: AbstractFocusModel, direction: string) => {
    const currentLayout = current.getLayout();
    const nextLayout = next.getLayout();

    const compareFn = () => {
        const dx = Math.max(
            currentLayout.absolute.xMin - nextLayout.absolute.xMin,
            0,
            nextLayout.absolute.xMin - currentLayout.absolute.xMax
        );
        const dy = Math.max(
            currentLayout.absolute.yMin - nextLayout.absolute.yMin,
            0,
            nextLayout.absolute.yMin - currentLayout.absolute.yMax
        );
        return Math.sqrt(dx*dx + dy*dy);
    };

    switch (direction) {
        case 'up': {
            if (currentLayout.yMin >= nextLayout.yMax) {
                return compareFn();
            }
            break;
        }
        case 'down': {
            if (currentLayout.yMax <= nextLayout.yMin) {
                return compareFn();
            }
            break;
        }
        case 'left': {
            if (currentLayout.xMin >= nextLayout.xMax) {
                return compareFn();
            }
            break;
        }
        case 'right': {
            if (currentLayout.xMax <= nextLayout.xMin) {
                return compareFn();
            }
            break;
        }   
        default:
            break;
    }

    return 99999999;
};

export const distCalc = (
    output: any,
    nextCls: AbstractFocusModel,
    guideLine: number,
    currentRectDimension: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,
    p8: number,
    p9: number,
    p12: number,
    direction: string,
    contextParameters: any,
    current: AbstractFocusModel,
    next: AbstractFocusModel,
) => {
    const { currentFocus }: { currentFocus: AbstractFocusModel } = contextParameters;
    // First we search based on the distance to guide line
    const ixOffset = intersectsOffset(guideLine, p3, p4);
    const nextVisible = nextIsVisible(p12, direction);
    const inOneLine = isInOneLine(direction, nextCls, currentFocus);
    const closestDistance = Math.abs(p5 - p6);
    const cornerDistance = p7 - p8;
    
    
    const closest = closestDist(current, next, direction);
    if (closest !== undefined && output.match1 >= closest + ixOffset) {
        output.match1 = closest + ixOffset;
        output.match1Context = nextCls;
        Logger.getInstance().debug('FOUND CLOSER M1', nextCls.getId(), closestDistance);
    }

    // Next up based on component size and it's center point
    const ix2 = intersects(p9, currentRectDimension, p3, p4);
    if (
        ix2 &&
        !inOneLine &&
        nextVisible &&
        cornerDistance < 0 &&
        output.match2 >= closestDistance &&
        output.match2IxOffset >= ixOffset
    ) {
        output.match2 = closestDistance;
        output.match2Context = nextCls;
        Logger.getInstance().debug('FOUND CLOSER M2', nextCls.getId(), closestDistance);
    }
    // Finally a search is based on arbitrary cut off size, so we could focus not entirely aligned items
    const ix3 = intersects(p9, CUTOFF_SIZE, p3, p4);

    if (
        ix3 &&
        !inOneLine &&
        nextVisible &&
        cornerDistance < 0 &&
        output.match3 >= closestDistance &&
        output.match3IxOffset >= ixOffset
    ) {
        if (nextCls.isFocusable()) {
            output.match3 = closestDistance;
            output.match3Context = nextCls;
            Logger.getInstance().debug('FOUND CLOSER M3', nextCls.getId(), closestDistance);
        } else {
            const firstInNextGroup = findFirstFocusableInGroup(nextCls);
            if (firstInNextGroup) {
                contextParameters.findClosestNode(firstInNextGroup, direction, output);
            }
        }
    }
};
