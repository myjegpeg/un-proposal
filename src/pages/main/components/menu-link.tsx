import { Link } from 'react-router-dom'

type Props = {
  href: string
  icon: React.ElementType
  title: string
}

export function MenuLink({ href, title, icon: Icon }: Props) {
  return (
    <Link
      to={href}
      className="w-full h-40 bg-midnight-light rounded-xl flex items-center justify-center gap-1 flex-col text-white font-medium text-lg shadow-xl"
    >
      <Icon className="size-9" />
      <span className="text-wrap w-3/4 leading-tight text-center">{title}</span>
    </Link>
  )
}
