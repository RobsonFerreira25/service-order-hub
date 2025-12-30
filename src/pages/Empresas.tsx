import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { mockEmpresas } from '@/data/mockData';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Building2,
  MoreHorizontal,
  MapPin,
  Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Empresas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredEmpresas = mockEmpresas.filter(
    (e) =>
      e.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.cnpj.includes(searchTerm)
  );

  return (
    <MainLayout
      title="Empresas"
      subtitle="Gerencie empresas e filiais"
    >
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Empresa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Empresa</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar uma nova empresa
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social *</Label>
                  <Input id="razaoSocial" placeholder="Razão social da empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nomeFantasia">Nome Fantasia *</Label>
                  <Input id="nomeFantasia" placeholder="Nome fantasia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matriz">Matriz</SelectItem>
                      <SelectItem value="filial">Filial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Endereço</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="logradouro">Logradouro *</Label>
                    <Input id="logradouro" placeholder="Rua, Avenida, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número *</Label>
                    <Input id="numero" placeholder="Número" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input id="complemento" placeholder="Sala, Andar, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro *</Label>
                    <Input id="bairro" placeholder="Bairro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input id="cidade" placeholder="Cidade" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado *</Label>
                    <Input id="estado" placeholder="UF" maxLength={2} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input id="cep" placeholder="00000-000" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Contato Responsável</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contatoNome">Nome *</Label>
                    <Input id="contatoNome" placeholder="Nome do responsável" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contatoCargo">Cargo</Label>
                    <Input id="contatoCargo" placeholder="Cargo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contatoEmail">E-mail *</Label>
                    <Input id="contatoEmail" type="email" placeholder="email@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contatoTelefone">Telefone *</Label>
                    <Input id="contatoTelefone" placeholder="(00) 0000-0000" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmpresas.map((empresa, index) => (
          <motion.div
            key={empresa.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-card rounded-xl border border-border/50 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{empresa.nomeFantasia}</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    {empresa.cnpj}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  {empresa.endereco.logradouro}, {empresa.endereco.numero}
                  {empresa.endereco.complemento && ` - ${empresa.endereco.complemento}`}
                  <br />
                  {empresa.endereco.cidade} - {empresa.endereco.estado}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {empresa.contatoResponsavel.telefone}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
              <Badge
                className={cn(
                  'status-badge',
                  empresa.tipo === 'matriz'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                {empresa.tipo === 'matriz' ? 'Matriz' : 'Filial'}
              </Badge>
              <Badge
                className={cn(
                  'status-badge',
                  empresa.status === 'ativo'
                    ? 'bg-success/10 text-success'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {empresa.status === 'ativo' ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </MainLayout>
  );
}
