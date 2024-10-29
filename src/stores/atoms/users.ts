import { atom } from "../customStore";

export const userAtom = atom(() => fetch('/user.json').then((result) => result.json()))
export const userKeysAtom = atom((get) => Object.keys(get(userAtom) ?? {}))
