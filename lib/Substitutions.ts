export interface PlantainSubstitutions extends Record<string, Substitutions> {
}

export interface Substitutions extends Record<string, Substitution> {
}

export interface Substitution {
    value: any
}
