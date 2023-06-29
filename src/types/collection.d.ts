import type { UUID } from "crypto";

export interface ICollection {
  id: UUID
  name: string
  created: Date
}
