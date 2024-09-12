import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterSchema, registerSchema } from '@/schemas/register-schema'
import { cpfMask, numericMask } from '@/utils/masks'
import { storageHandler } from '@/utils/storageHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon, SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function Register() {
  const savedStudent = storageHandler.getStorage<RegisterSchema>('aluno')

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: savedStudent ?? {
      name: '',
      cpf: '',
      collegeCourse: '',
      registrationNumber: '',
      expirationDate: {
        month: `0${new Date().getMonth()}`.slice(-2),
        year: String(new Date().getFullYear() + 1),
      },
    },
  })

  const { watch, setValue } = form

  const photoRef = form.register('photo.file')
  const photoBase64Watch = watch('photo.base64')

  function onSubmit(data: RegisterSchema) {
    const photoFile = data.photo.file[0]

    if (!photoFile) {
      toast.error('Você deve carregar uma foto válida!')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setValue('photo.base64', base64String)
      storageHandler.setStorage<RegisterSchema>('aluno', {
        ...data,
        photo: { ...data.photo, base64: base64String },
      })

      toast.success('Aluno salvo com sucesso!')
    }
    reader.readAsDataURL(photoFile)
  }

  return (
    <div className="bg-background">
      <header className="flex justify-between items-center fixed top-0 left-0 h-12 bg-midnight-dark w-full z-10 text-white px-3 shadow-lg">
        <Link to="/">
          <ChevronLeftIcon className="size-5" />
        </Link>
        <h1 className="font-medium">Registro de Aluno</h1>
        <ChevronLeftIcon className="size-5 invisible" />
      </header>

      <main className="mt-12 min-h-[calc(100vh-48px)] flex flex-col items-center py-8 px-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="photo.file"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    {!!photoBase64Watch && (
                      <div className="w-full flex items-center justify-center">
                        <img
                          src={photoBase64Watch}
                          alt="Foto do aluno"
                          className="object-cover size-36 border-black border"
                        />
                      </div>
                    )}
                    <FormControl>
                      <Input type="file" accept="image/*" {...photoRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Pedro da Silva" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="111.111.111-11"
                      minLength={14}
                      maxLength={14}
                      onChange={(e) => {
                        const { value } = e.target
                        form.setValue('cpf', cpfMask(value))
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="111111111"
                      minLength={9}
                      maxLength={9}
                      onChange={(e) => {
                        const { value } = e.target
                        form.setValue('registrationNumber', numericMask(value))
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collegeCourse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Engenharia de Produção..." />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Validade</FormLabel>
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="expirationDate.month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mês</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="01"
                          minLength={2}
                          maxLength={2}
                          onChange={(e) => {
                            const { value } = e.target
                            form.setValue(
                              'expirationDate.month',
                              numericMask(value),
                            )
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expirationDate.year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ano</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          minLength={4}
                          maxLength={4}
                          placeholder="2025"
                          onChange={(e) => {
                            const { value } = e.target
                            form.setValue(
                              'expirationDate.year',
                              numericMask(value),
                            )
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              <SaveIcon className="size-4 mr-2" />
              Salvar
            </Button>
          </form>
        </Form>
      </main>
    </div>
  )
}
