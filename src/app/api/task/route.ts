import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Task {
	id: number
	nombre: string
	descripcion: string
	prioridad: string
	createdAt: Date
	updatedAt: Date
}

// Handle GET requests
export async function GET() {
	try {
		const tasks: Task[] = await prisma.task.findMany()
		return NextResponse.json(tasks)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Failed to fetch tasks' },
			{ status: 500 }
		)
	}
}
