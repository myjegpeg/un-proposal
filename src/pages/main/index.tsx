import {
  CircleDollarSignIcon,
  ForkKnifeCrossedIcon,
  MenuIcon,
  UserIcon,
  WalletCardsIcon,
} from 'lucide-react'
import { MenuLink } from './components/menu-link'

export function Main() {
  return (
    <div className="bg-background">
      <header className="flex justify-between items-center fixed top-0 left-0 h-10 bg-midnight-dark w-full z-10 text-white px-3">
        <MenuIcon className="size-5" />
      </header>

      <main className="mt-10 min-h-[calc(100vh-40px)] flex flex-col items-center py-8 px-2">
        <h1 className="text-midnight-dark text-xl font-bold">Início Rápido</h1>

        <div className="flex-1 flex items-center justify-center w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            <MenuLink
              href="#"
              icon={ForkKnifeCrossedIcon}
              title="Acesso ao RU"
            />

            <MenuLink
              href="#"
              icon={CircleDollarSignIcon}
              title="Saldo e Extrato"
            />

            <MenuLink href="#" icon={UserIcon} title="Carteirinha Digital" />

            <MenuLink href="#" icon={WalletCardsIcon} title="Recarga" />
          </div>
        </div>
      </main>
    </div>
  )
}
