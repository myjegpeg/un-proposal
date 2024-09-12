import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { RegisterSchema } from '@/schemas/register-schema'
import { storageHandler } from '@/utils/storage-handler'
import { unavailableMessage } from '@/utils/unavailable-message'
import {
  CircleDollarSignIcon,
  CircleHelpIcon,
  ExternalLinkIcon,
  ForkKnifeIcon,
  HelpCircleIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  WalletIcon,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarItem } from './sidebar-item'

export function Sidebar() {
  const navigate = useNavigate()
  const student = storageHandler.getStorage<RegisterSchema>('aluno')

  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        {!student && (
          <div className="py-2 px-4 text-center">
            <Link
              to="/saldo-e-extrato"
              className="underline underline-offset-8 font-medium text-sm"
            >
              Clique para registrar um aluno
            </Link>
          </div>
        )}

        {!!student && (
          <>
            <SheetHeader className="bg-midnight-dark text-left py-2 px-4 text-white space-y-20">
              <SheetTitle className="text-white text-base">
                {student.name}
              </SheetTitle>

              <button
                className="flex items-center justify-end gap-1 text-right text-sm"
                onClick={() => {
                  storageHandler.deleteStorage('aluno')
                  navigate(0)
                }}
              >
                <LogOutIcon className="size-4" />
                Desconectar
              </button>
            </SheetHeader>

            <ul className="flex flex-col py-4">
              <SidebarItem
                icon={WalletIcon}
                title="Recarga"
                onClick={unavailableMessage}
              />

              <SidebarItem
                icon={CircleDollarSignIcon}
                title="Saldo e Extrato"
                href="/saldo-e-extrato"
              />

              <SidebarItem
                icon={ForkKnifeIcon}
                title="Acesso ao RU"
                onClick={unavailableMessage}
              />

              <SidebarItem
                icon={UserIcon}
                title="Carteirinha Digital"
                href="/carteirinha-digital"
              />

              <Dialog>
                <DialogTrigger asChild>
                  <SidebarItem
                    icon={CircleHelpIcon}
                    title="Perguntas Frequentes"
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="text-left">
                    <DialogTitle className="flex items-center gap-2 text-neutral-500">
                      <HelpCircleIcon />
                      Perguntas Frequentes
                    </DialogTitle>
                    <DialogDescription className="text-neutral-900">
                      Este aplicativo é um projeto de estudos para a Carteirinha
                      Digital UFF, analisando pontos de melhoria e modernização
                      do sistema.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <SidebarItem
                icon={ExternalLinkIcon}
                title="UFF Mobile Plus"
                onClick={unavailableMessage}
              />
            </ul>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
