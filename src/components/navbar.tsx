import Link from 'next/link'
import { buttonVariants } from './ui/button'

export const Navbar = () => {
	return (
		<nav className="flex justify-between p-4">
			<h1>Crud Con Next.js</h1>

			<div>
				<Link
					href={'/new'}
					className={buttonVariants({ variant: 'secondary' })}
				>
					Crear tarea
				</Link>
			</div>
		</nav>
	)
}
