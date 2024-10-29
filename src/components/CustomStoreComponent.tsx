import { useAtom, useAtomValue } from '../stores/customStore'
import { extraPointsAtom, pointsAtom, totalPointsAtom } from '../stores/atoms/points'
import { userAtom, userKeysAtom } from '../stores/atoms/users'

export default function CustomStoreComponent() {
  const [points, setPoints] = useAtom(pointsAtom)
  const [extraPoints, setExtraPoints] = useAtom(extraPointsAtom)
  const totalPoints = useAtomValue(totalPointsAtom)

  const user = useAtomValue(userAtom)
  const userKeys = useAtomValue(userKeysAtom)

  return (
    <div>
      <div>
      <input type="text" value={points} onChange={(event) => setPoints(+event.target.value)} />
      <div>Points: {points}</div>
      </div>
      
      <div>
      <input type="text" value={extraPoints} onChange={(event) => setExtraPoints(+event.target.value)} />
      <div>Extra Points: {extraPoints}</div>
      <hr />
      <div>Total Points: {totalPoints}</div>
      </div>
      <hr />

      <div>User: {JSON.stringify(user)}</div>
      <div>User Keys: {JSON.stringify(userKeys)}</div>
    </div>
  )
}
