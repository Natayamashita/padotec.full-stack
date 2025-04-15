import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface Log {
  lockId: number
  mac: string
  payload: {
    logId: number
    timestamp: string
    type: number
    method: number
    isLocked: boolean
    userId: number
    userName: string
  }
}

interface LogTableProps {
  logs: Log[]
}

export default function LogTable({ logs }: LogTableProps) {
  const getEventType = (type: number) => {
    switch (type) {
      case 1:
        return { label: "Abertura", variant: "success" as const }
      case 2:
        return { label: "Travamento", variant: "default" as const }
      default:
        return { label: "Desconhecido", variant: "outline" as const }
    }
  }

  const getAccessMethod = (method: number) => {
    switch (method) {
      case 3:
        return "Cartão RFID"
      case 4:
        return "Aplicativo"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] border-r-1">Log ID</TableHead>
            <TableHead className="text-center border-r-1">Timestamp</TableHead>
            <TableHead className="text-center border-r-1">Dispositivo</TableHead>
            <TableHead className="text-center border-r-1">MAC</TableHead>
            <TableHead className="text-center border-r-1">Evento</TableHead>
            <TableHead className="text-center border-r-1">Método</TableHead>
            <TableHead className="text-center border-r-1">Estado</TableHead>
            <TableHead className="text-center border-r-1">Usuário</TableHead>
            <TableHead className="text-center border-r-1">ID Usuário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length > 0 ? (
            logs.map((log) => {
              const eventType = getEventType(log.payload.type)

              return (
                <TableRow key={log.payload.logId} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{log.payload.logId}</TableCell>
                  <TableCell>{formatDate(log.payload.timestamp)}</TableCell>
                  <TableCell>{log.lockId}</TableCell>
                  <TableCell className="font-mono text-xs">{log.mac}</TableCell>
                  <TableCell>
                    <Badge  className="w-full" variant={eventType.variant}>{eventType.label}</Badge>
                  </TableCell>
                  <TableCell>{getAccessMethod(log.payload.method)}</TableCell>
                  <TableCell>
                    <Badge className="w-full"  variant={log.payload.isLocked ? "destructive" : "success"}>
                      {log.payload.isLocked ? "Trancado" : "Destrancado"}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.payload.userName}</TableCell>
                  <TableCell>{log.payload.userId}</TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
