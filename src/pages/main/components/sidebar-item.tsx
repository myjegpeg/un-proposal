import { Link } from 'react-router-dom'

type Props = {
  icon: React.ElementType
  title: string
  href?: string
  onClick?: () => void
}

function Wrapper({
  href,
  children,
}: { href?: string } & React.PropsWithChildren) {
  if (href) return <Link to={href}>{children}</Link>

  return children
}

export function SidebarItem({ title, icon: Icon, href, onClick }: Props) {
  return (
    <Wrapper href={href}>
      <li
        className="flex items-center gap-1.5 font-semibold px-4 py-4 hover:bg-slate-100"
        onClick={onClick}
      >
        <Icon className="text-neutral-500" />
        {title}
      </li>
    </Wrapper>
  )
}
