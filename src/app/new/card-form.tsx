import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

async function createTask(formData: FormData) {
	'use server'

	const nombre = formData.get('nombre')?.toString()
	const descripcion = formData.get('descripcion')?.toString()
	const prioridad = formData.get('prioridad')?.toString()

	console.log({ nombre, descripcion, prioridad })

	if (!nombre || !descripcion || !prioridad) {
		return
	}

	await prisma.task.create({ data: { nombre, descripcion, prioridad } })

	redirect('/')
}

export function CardWithForm() {
	return (
		<form action={createTask}>
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Crear tarea</CardTitle>
					<CardDescription>Crear una nueva tarea</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="nombre">Nombre</Label>
							<Input
								id="nombre"
								name="nombre"
								placeholder="Nombre de la tarea"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="descripcion">Descripción</Label>
							<Input
								id="descripcion"
								name="descripcion"
								placeholder="Descripción de la tarea"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="prioridad">Prioridad</Label>
							<Select name="prioridad">
								<SelectTrigger id="prioridad">
									<SelectValue placeholder="Selecciona una prioridad" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="baja">Baja</SelectItem>
									<SelectItem value="media">Media</SelectItem>
									<SelectItem value="alta">Alta</SelectItem>
									<SelectItem value="urgente">Urgente</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Cancelar</Button>
					<Button type="submit">Registrar</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
