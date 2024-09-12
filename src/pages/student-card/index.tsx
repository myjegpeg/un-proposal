import Logo from '@/assets/logo.png'
import LogoAlt from '@/assets/logo2.png'
import { Separator } from '@/components/ui/separator'

import { LoadingContainer } from '@/components/loading-container'
import { RegisterSchema } from '@/schemas/register-schema'
import { storageHandler } from '@/utils/storage-handler'
import { unavailableMessage } from '@/utils/unavailable-message'
import { ChevronLeftIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QrCode } from './components/qr-code'

export function StudentCard() {
  const student = storageHandler.getStorage<RegisterSchema>('aluno')

  return (
    <div className="bg-midnight-light">
      <header className="flex justify-between items-center fixed top-0 left-0 h-12 bg-midnight-dark w-full z-10 text-white px-3 shadow-lg">
        <Link to="/">
          <ChevronLeftIcon className="size-5" />
        </Link>
        <h1 className="font-medium">Carteirinha Digital</h1>
        <ChevronLeftIcon className="size-5 invisible" />
      </header>

      <LoadingContainer>
        <main className="mt-12 min-h-[calc(100vh-48px)] flex flex-col items-center p-4 gap-6 text-white">
          {!student && (
            <Link
              to="/saldo-e-extrato"
              className="underline underline-offset-8 text-lg font-medium"
            >
              Clique para registrar um aluno
            </Link>
          )}
          {student && (
            <>
              <img src={Logo} alt="Logo" width={160} height={160} />

              {student.photo.base64 ? (
                <img
                  src={student.photo.base64}
                  alt="Foto do aluno"
                  className="object-cover size-36 border-white border"
                />
              ) : (
                <div className="size-36 bg-white" />
              )}

              <div className="flex flex-col items-center gap-1">
                <h2 className="text-lg">{student.name}</h2>
                <span className="text-sm">{`Documento: ${student.cpf.replace(/[.,-\s]/g, '')}`}</span>
              </div>

              <section className="bg-white rounded-2xl flex flex-col gap-2 p-4 w-full items-center">
                <img
                  src={LogoAlt}
                  alt="Logo alternativa"
                  width={90}
                  height={90}
                />

                <div className="flex flex-col gap-1 w-full">
                  <h1 className="text-midnight-light font-bold">Aluno</h1>

                  <Separator />

                  <div className="grid grid-cols-2 text-black gap-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold leading-none">
                        Matrícula
                      </span>
                      <span className="leading-none">
                        {student.registrationNumber}
                      </span>
                    </div>

                    <div className="flex flex-col gap-0.5 text-end">
                      <span className="font-semibold leading-none">
                        Validade
                      </span>
                      <span className="leading-none">
                        {`${student.expirationDate.month}/${student.expirationDate.year}`}
                      </span>
                    </div>

                    <div className="flex flex-col gap-0.5 col-span-2">
                      <span className="font-semibold leading-none">Curso</span>
                      <span className="leading-none">
                        {student.collegeCourse}
                      </span>
                    </div>
                  </div>
                </div>

                <QrCode width={160} height={160} className="my-6" />

                <div className="bg-whitesmoke rounded-2xl px-3 py-2 text-center flex flex-col text-black text-xs">
                  <span>Valide o código gerado utilizando o aplicativo</span>
                  <span className="font-semibold" onClick={unavailableMessage}>
                    Validador Carteirinha UFF
                  </span>
                </div>
              </section>
            </>
          )}
        </main>
      </LoadingContainer>
    </div>
  )
}
