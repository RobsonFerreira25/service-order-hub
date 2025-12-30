import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockOrdensServico, mockEmpresas, mockFuncionarios } from '@/data/mockData';
import {
  StatusOSLabels,
  EspecialidadeLabels,
  PrioridadeLabels,
  StatusOS,
  Especialidade,
} from '@/types';
import {
  Plus,
  Search,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Clock,
  Building2,
  User,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const statusStyles: Record<StatusOS, string> = {
  aberta: 'status-aberta',
  em_andamento: 'status-em-andamento',
  pausada: 'status-pausada',
  concluida: 'status-concluida',
  cancelada: 'status-cancelada',
};

const prioridadeStyles: Record<string, string> = {
  baixa: 'bg-muted text-muted-foreground',
  media: 'bg-info/10 text-info',
  alta: 'bg-warning/10 text-warning',
  urgente: 'bg-destructive/10 text-destructive',
};

export default function OrdensServico() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOS, setSelectedOS] = useState<typeof mockOrdensServico[0] | null>(null);

  const filteredOS = mockOrdensServico.filter((os) => {
    const matchesSearch =
      os.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || os.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout
      title="Ordens de Serviço"
      subtitle="Gerencie todas as ordens de serviço"
    >
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(StatusOSLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nova OS
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova Ordem de Serviço</DialogTitle>
              <DialogDescription>
                Preencha os dados para abrir uma nova OS
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmpresas.map((empresa) => (
                        <SelectItem key={empresa.id} value={empresa.id}>
                          {empresa.nomeFantasia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoServico">Tipo de Serviço *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(EspecialidadeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prioridade">Prioridade *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PrioridadeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataPrevista">Data Prevista de Conclusão</Label>
                  <Input id="dataPrevista" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="funcionarios">Funcionários Designados</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os funcionários" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFuncionarios
                      .filter((f) => f.status === 'ativo')
                      .map((funcionario) => (
                        <SelectItem key={funcionario.id} value={funcionario.id}>
                          {funcionario.nome} - {funcionario.matricula}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição Detalhada *</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva o serviço a ser realizado..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações adicionais..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Abrir OS</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="table-container"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Abertura</TableHead>
              <TableHead>Previsão</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOS.map((os) => {
              const empresa = mockEmpresas.find((e) => e.id === os.empresaId);
              return (
                <TableRow key={os.id}>
                  <TableCell>
                    <span className="font-semibold text-primary">{os.numero}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>{empresa?.nomeFantasia}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {EspecialidadeLabels[os.tipoServico]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('status-badge', prioridadeStyles[os.prioridade])}>
                      {PrioridadeLabels[os.prioridade]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('status-badge', statusStyles[os.status])}>
                      {StatusOSLabels[os.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {format(new Date(os.dataAbertura), 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                  </TableCell>
                  <TableCell>
                    {os.dataPrevistaConclusao ? (
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        {format(new Date(os.dataPrevistaConclusao), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <SheetTrigger asChild>
                            <DropdownMenuItem onClick={() => setSelectedOS(os)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                          </SheetTrigger>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <SheetContent className="w-[500px] sm:max-w-[500px]">
                        <SheetHeader>
                          <SheetTitle className="text-primary">{selectedOS?.numero}</SheetTitle>
                          <SheetDescription>
                            Detalhes da Ordem de Serviço
                          </SheetDescription>
                        </SheetHeader>
                        {selectedOS && (
                          <div className="mt-6 space-y-6">
                            <div className="flex gap-2">
                              <Badge
                                className={cn('status-badge', statusStyles[selectedOS.status])}
                              >
                                {StatusOSLabels[selectedOS.status]}
                              </Badge>
                              <Badge
                                className={cn(
                                  'status-badge',
                                  prioridadeStyles[selectedOS.prioridade]
                                )}
                              >
                                {PrioridadeLabels[selectedOS.prioridade]}
                              </Badge>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                  Empresa
                                </h4>
                                <p className="font-medium">
                                  {mockEmpresas.find((e) => e.id === selectedOS.empresaId)
                                    ?.nomeFantasia}
                                </p>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                  Tipo de Serviço
                                </h4>
                                <p className="font-medium">
                                  {EspecialidadeLabels[selectedOS.tipoServico]}
                                </p>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                  Descrição
                                </h4>
                                <p className="text-sm">{selectedOS.descricao}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Data Abertura
                                  </h4>
                                  <p className="font-medium">
                                    {format(
                                      new Date(selectedOS.dataAbertura),
                                      "dd/MM/yyyy 'às' HH:mm",
                                      { locale: ptBR }
                                    )}
                                  </p>
                                </div>
                                {selectedOS.dataPrevistaConclusao && (
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                      Previsão
                                    </h4>
                                    <p className="font-medium">
                                      {format(
                                        new Date(selectedOS.dataPrevistaConclusao),
                                        'dd/MM/yyyy',
                                        { locale: ptBR }
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                  Funcionários Designados
                                </h4>
                                <div className="space-y-2">
                                  {selectedOS.funcionariosIds.map((id) => {
                                    const func = mockFuncionarios.find((f) => f.id === id);
                                    return func ? (
                                      <div
                                        key={id}
                                        className="flex items-center gap-2 text-sm"
                                      >
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <span>
                                          {func.nome} ({func.matricula})
                                        </span>
                                      </div>
                                    ) : null;
                                  })}
                                </div>
                              </div>

                              {selectedOS.observacoes && (
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Observações
                                  </h4>
                                  <p className="text-sm">{selectedOS.observacoes}</p>
                                </div>
                              )}

                              {selectedOS.observacoesFechamento && (
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Observações de Fechamento
                                  </h4>
                                  <p className="text-sm">{selectedOS.observacoesFechamento}</p>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 pt-4 border-t">
                              <Button className="flex-1">Atualizar Status</Button>
                              <Button variant="outline" className="flex-1">
                                Imprimir PDF
                              </Button>
                            </div>
                          </div>
                        )}
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </MainLayout>
  );
}
