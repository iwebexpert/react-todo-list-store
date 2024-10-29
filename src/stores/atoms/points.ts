import { atom } from "../customStore";

export const pointsAtom = atom(10_000)
export const extraPointsAtom = atom(1_000)
export const totalPointsAtom = atom((get) => get(pointsAtom) + get(extraPointsAtom))
