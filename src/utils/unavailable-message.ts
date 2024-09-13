import { toast } from 'sonner'

export function unavailableMessage() {
  toast.dismiss()
  toast.error('Função temporariamente desativada!')
}
