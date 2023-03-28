import {createContext} from "react";
import {Park} from "../../core/model/Park";

interface ParkListContextProps {
    parkList: () => Park[];
}

const defaultParkListBehavior: ParkListContextProps = {
    parkList: () => [],
};

export const ParkListContext = createContext(defaultParkListBehavior);
