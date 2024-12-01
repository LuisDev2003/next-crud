'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import useSWR from 'swr'

interface Task {
	id: number
	nombre: string
	descripcion: string
	prioridad: string
	createdAt: Date
	updatedAt: Date
}

const fetchTasks = async (): Promise<Task[]> => {
	const res = await fetch('/api/task')
	if (!res.ok) throw new Error('Failed to fetch')
	return res.json()
}

export default function Home() {
	const {
		data: tasks = [],
		error,
		isLoading,
	} = useSWR<Task[]>('/api/task', fetchTasks)

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Failed to load tasks</div>

	return (
		<div className="">
			<div className="flex gap-5">
				{tasks.map(task => (
					<Card key={task.id} className="min-w-64">
						<CardHeader className="flex justify-between flex-row space-y-0">
							<span className="uppercase font-bold">{task.nombre}</span>
							<span className="bg-neutral-200 text-black text-xs px-2 py-1 block rounded-full">
								{task.prioridad}
							</span>
						</CardHeader>
						<CardContent className="font-normal text-gray-700 dark:text-gray-400">
							{task.descripcion}
						</CardContent>
						<CardFooter>
							<Button className="mr-2">Editar</Button>
							<Button variant={'destructive'}>Eliminar</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}

