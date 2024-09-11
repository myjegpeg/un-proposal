import { useLoading } from '@/hooks/use-loading'
import { LoadingBackground } from './loading-background'

type Props = {
  loadingDuration?: number
} & React.PropsWithChildren

export function LoadingContainer({ children, loadingDuration = 1 }: Props) {
  const isLoadingPage = useLoading({ delay: loadingDuration })

  return isLoadingPage ? <LoadingBackground /> : children
}
