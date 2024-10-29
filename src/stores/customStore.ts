import { useSyncExternalStore } from "react";

interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType | ((prevValue: AtomType) => AtomType)) => void
  subscribe: (callback: (newValue: AtomType) => void) => () => void
  _subscribes: () => number
}

type AtomGetter<AtomType> = (
  get: <Target>(a: Atom<Target>) => Target
) => AtomType

export function atom<AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>
): Atom<AtomType> {
  let value: AtomType = typeof initialValue === 'function' ? (null as AtomType) : initialValue
  const subscribers = new Set<(newValue: AtomType) => void>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribed = new Set<Atom<any>>()

  function get<Target>(atom: Atom<Target>) {
    let currentValue = atom.get()
    // console.log(atom._subscribes());

    if (!subscribed.has(atom)) {
      subscribed.add(atom)

      atom.subscribe(function (newValue) {
        if (currentValue === newValue) return;

        currentValue = newValue
        computeValue() // Вычисляем значение перед обновлением компонентов, которые были подписаны
        // subscribers.forEach((callback) => callback(value))
      })
    }

    return currentValue
  }

  async function computeValue() {
    const newValue = typeof initialValue === 'function' ? (initialValue as AtomGetter<AtomType>)(get) : value

    // Проверка на Promise
    if (newValue && typeof (newValue as unknown as Promise<AtomType>).then === 'function') {
      value = (null as AtomType);

      (newValue as unknown as Promise<AtomType>).then((resolvedValue) => {
        value = resolvedValue
        subscribers.forEach((callback) => callback(value))
      })
    } else {
      value = newValue
      subscribers.forEach((callback) => callback(value))
    }
  }

  // После любого обновления
  computeValue()

  return {
    get: () => value,
    set: (newValue) => {
      if (typeof newValue === 'function') {
        value = (newValue as (prev: AtomType) => AtomType)(value)
      } else {
        value = newValue
      }

      computeValue()
    },
    subscribe: (callback) => {
      subscribers.add(callback)

      return () => {
        subscribers.delete(callback)
      }
    },
    _subscribes: () => subscribers.size,
  }
}

// export function useAtom<AtomType>(atom: Atom<AtomType>): [AtomType, (newValue: AtomType) => void] {
//   const [value, setValue] = useState(atom.get())

//   useEffect(() => {
//     const unsubscribe = atom.subscribe(setValue)

//     return () => {
//       unsubscribe()
//     }
//   }, [atom])

//   return [value, atom.set]
// }

// export function useAtomValue<AtomType>(atom: Atom<AtomType>): AtomType {
//   const [value, setValue] = useState(atom.get())

//   useEffect(() => {
//     const unsubscribe = atom.subscribe(setValue)

//     return () => {
//       unsubscribe()
//     }
//   }, [atom])

//   return value
// }


export function useAtom<AtomType>(atom: Atom<AtomType>): [AtomType, (newValue: AtomType) => void] {
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set]
}

export function useAtomValue<AtomType>(atom: Atom<AtomType>): AtomType {
  return useSyncExternalStore(atom.subscribe, atom.get)
}
