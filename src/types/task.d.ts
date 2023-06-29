import type { UUID } from "crypto"

export interface ITask {
  id: UUID
  name: string
  description: string
  status: Status
  collection: UUID
  created: Date
}
