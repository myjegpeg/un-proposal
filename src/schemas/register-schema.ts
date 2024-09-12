import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Este campo é obrigatório.' }),
  photo: z.object({
    file: z.instanceof(FileList).or(z.undefined()),
    base64: z.string().optional(),
  }),
  registrationNumber: z
    .string()
    .min(9, { message: 'Digite uma mátricula válida.' }),
  expirationDate: z.object({
    month: z.string().refine(
      (month) => {
        if (month.length !== 2) return false

        const numberMonth = Number(month)
        return numberMonth >= 1 && numberMonth <= 12
      },
      { message: 'Digite um mês válido.' },
    ),
    year: z.string().refine(
      (year) => {
        if (year.length !== 4) return false

        const numberYear = Number(year)
        return numberYear >= 1960 && numberYear <= 2040
      },
      { message: 'Digite um ano válido.' },
    ),
  }),
  collegeCourse: z.string().min(1, { message: 'Este campo é obrigatório.' }),
  cpf: z.string().refine(
    (cpf: string) => {
      if (typeof cpf !== 'string') return false

      cpf = cpf.replace(/[^\d]+/g, '')
      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

      const cpfDigits = cpf.split('').map((el) => +el)
      const rest = (count: number): number => {
        return (
          ((cpfDigits
            .slice(0, count - 12)
            .reduce((soma, el, index) => soma + el * (count - index), 0) *
            10) %
            11) %
          10
        )
      }

      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10]
    },
    { message: 'Digite um CPF válido.' },
  ),
})

export type RegisterSchema = z.infer<typeof registerSchema>
