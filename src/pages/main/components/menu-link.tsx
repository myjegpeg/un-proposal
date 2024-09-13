import { Link } from 'react-router-dom';

const DEFAULT_CLASSNAME =
  'w-full h-40 bg-midnight-light rounded-xl flex items-center justify-center gap-1 flex-col text-white font-medium text-lg shadow-xl'

function Wrapper({
  href,
  children,
  onClick,
}: { href?: string; onClick?: () => void } & React.PropsWithChildren) {
  if (href)
    return (
      <Link to={href} className={DEFAULT_CLASSNAME}>
        {children}
      </Link>
    )

  return (
    <button className={DEFAULT_CLASSNAME} onClick={onClick}>
      {children}
    </button>
  )
}

type Props = {
  icon: React.ElementType
  title: string
  href?: string
  onClick?: () => void
}

export function MenuLink({ title, icon: Icon, href, onClick }: Props) {
  return (
    <Wrapper href={href} onClick={onClick}>
      <Icon className="size-9" />
      <span className="text-wrap w-3/4 leading-tight text-center">{title}</span>
    </Wrapper>
  )
}
