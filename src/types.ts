export type StringDict = { [k: string]: string }

export type ApiResponse<P = {}> = {
  count: number
  next: string | null
  previous: string | null
  results: P
}

export type Person = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color:string
  gender: string
  birth_year: string
}

export type Planet = {
  name: string
  terrain: string
  population: string
}

export type Movie = {
  title: string
  director: string
  producer: string
}
