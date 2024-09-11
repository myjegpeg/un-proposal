import Logo from '@/assets/logo3.png'

export function LoadingBackground() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-midnight-light">
      <img src={Logo} alt="Logo" width={100} className="animate-pulse" />
    </div>
  )
}
