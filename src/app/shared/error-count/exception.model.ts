export interface Exception {
  id: string,
  user: string,
  date: Date,
  type: string,
  description: string,
  stacktrace: string,
  project: string
}
