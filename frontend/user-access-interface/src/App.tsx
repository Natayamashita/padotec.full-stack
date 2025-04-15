"use client"

import { useEffect, useState } from "react"
import "./App.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Label } from "@radix-ui/react-label"
import { Input } from "./components/ui/input"
import { Badge } from "./components/ui/badge"
import { Search } from "lucide-react"
import LogTable from "./components/log-table"

function App() {
  const [viewType, setViewType] = useState("device")
  const [userNameFilter, setUserNameFilter] = useState("")
  const [userIdFilter, setUserIdFilter] = useState("")
  const [macFilter, setMacFilter] = useState("")
  const [lockIdFilter, setLockIdFilter] = useState("")
  const [logs, setLogs] = useState([]) // Dados originais
  const [filteredLogs, setFilteredLogs] = useState([]) // Dados filtrados

  // Buscar dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json")
        const data = await res.json()
        setLogs(data) // Armazena os dados originais
        setFilteredLogs(data) 
      } catch (err) {
        console.error("Erro ao buscar dados:", err)
      }
    }

    fetchData()
  }, []) // Executa apenas uma vez na montagem

  useEffect(() => {
    if (logs.length === 0) return

    const sortedLogs = [...logs].sort((a, b) => b.payload.logId - a.payload.logId)
    let filtered = sortedLogs

    if (viewType === "user") {
      if (userNameFilter) {
        filtered = filtered.filter((log) => log.payload.userName.toLowerCase().includes(userNameFilter.toLowerCase()))
      }

      if (userIdFilter) {
        filtered = filtered.filter((log) => log.payload.userId.toString() === userIdFilter)
      }
    } else if (viewType === "device") {
      if (macFilter) {
        filtered = filtered.filter((log) => log.mac.toLowerCase().includes(macFilter.toLowerCase()))
      }

      if (lockIdFilter) {
        filtered = filtered.filter((log) => log.lockId.toString() === lockIdFilter)
      }
    }

    setFilteredLogs(filtered)
  }, [logs, viewType, userNameFilter, userIdFilter, macFilter, lockIdFilter]) 

  return (
    <main className="container mx-auto py-8">
      <Card className="mb-8 w-4xl">
        <CardHeader>
          <CardTitle>Sistema de Visualização de Logs</CardTitle>
          <CardDescription>Visualize e filtre logs por dispositivo de segurança ou usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="device" onValueChange={setViewType}>
            <TabsList className="flex gap-4 justify-center mb-4">
              <TabsTrigger className={viewType === "device" ? " text-white" : "text-neutral-600"} value="device">
                Por Dispositivo de Segurança
              </TabsTrigger>
              <TabsTrigger className={viewType === "user" ? " text-white" : "text-neutral-600"} value="user">
                Por Usuário
              </TabsTrigger>
            </TabsList>

            <TabsContent value="device">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="mac">Endereço MAC</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mac"
                      placeholder="Ex: AA:BB:CC:DD:EE:FF"
                      className="pl-8"
                      value={macFilter}
                      onChange={(e) => setMacFilter(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lockId">ID do Dispositivo</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lockId"
                      placeholder="Ex: bb62c159-749a-405d-88ec-55e54c783814"
                      className="pl-8"
                      value={lockIdFilter}
                      onChange={(e) => setLockIdFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="user">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="userName">Nome do Usuário</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="userName"
                      placeholder="Digite o nome do usuário"
                      className="pl-8"
                      value={userNameFilter}
                      onChange={(e) => setUserNameFilter(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="userId">ID do Usuário</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="userId"
                      placeholder="Ex: 123"
                      className="pl-8"
                      value={userIdFilter}
                      onChange={(e) => setUserIdFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Logs</h2>
            <Badge variant="outline" className="px-2 py-1">
              {filteredLogs.length} registros encontrados
            </Badge>
          </div>

          <LogTable logs={filteredLogs} />
        </CardContent>
      </Card>
    </main>
  )
}

export default App
