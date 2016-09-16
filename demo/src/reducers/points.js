import find from "lodash/fp/find";
import round from "lodash/round";

import { DETECT, HIDE } from "../actions/points";
import cloneState from "../utils/cloneState";

var initialState = [];

const findPoint = (points, point) => find((p) => p.data.id == point.data.id)(points);

export default function points(state = initialState, action = null) {

    switch(action.type) {

        case DETECT:
            return cloneState(state, (s) => {
                var point = findPoint(s, action.point);
                point && (point.visible = true);
                point.distance = round(action.point.distance);
                point.bearing = round(action.point.bearing);
                return s;
            });

        case HIDE:
            return cloneState(state, (s) => {
                var point = findPoint(s, action.point);
                point && (point.visible = false);
                return s;
            });

        default:
            return state;
    }

}