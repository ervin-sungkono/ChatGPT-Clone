import { NextResponse } from "next/server"
import pdf from 'pdf-parse/lib/pdf-parse'

export async function POST(request){
    const formData = await request.formData()
    const pdfFile = formData.get('pdfFile')
    const buffer = Buffer.from(await pdfFile.arrayBuffer())

    try {
        const parsedPdf = await pdf(buffer)
        return NextResponse.json(parsedPdf)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}