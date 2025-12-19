import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card,CardHeader,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus,Check,List,SquareX,Pencil,Trash,ListChecks,Sigma  } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Home = () => {
  return(
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center" >
      
      
      <Card className="w-lg">
        <CardHeader className= "flex gap-2">
          <Input placeholder="Adicionar tarefa"/>
          <Button  className= "cursor-pointer"> <Plus />Cadastrar</Button>
        </CardHeader>


        <CardContent>
          <Separator className="mb-4"/>
          <div className="flex gap-2">

            <Badge  className="cursor-pointer" variant="default">  <List /> Todos</Badge>
            <Badge  className="cursor-pointer" variant="outline"> <SquareX/> Não finalizados</Badge>
            <Badge  className="cursor-pointer" variant="outline"> <Check/> Concluidas</Badge>

          </div>

          <div className="mt-4 border-b-1">

            <div className="flex justify-between h-14 items-center border-t-1">
                <div className="w-2 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">Tarefa 1</p>

                <div className="flex gap-2 items-center">

                  <Dialog>
                    <DialogTrigger asChild>
                      <Pencil size={16} className="cursor-pointer"/>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar tarefa</DialogTitle>
                      </DialogHeader>

                      <div className="flex gap-2">

                        <Input placeholder="Editar da tarefa"/>
                        <Button className="cursor-poiter"> Salvar</Button>
                      </div>

                    </DialogContent>
                  </Dialog>

                  <Trash size={16} className="cursor-pointer"/>
                </div>  
            </div>

            <div className="flex justify-between h-14 items-center border-t-1">
                <div className="w-2 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">Tarefa 1</p>

                <div className="flex gap-2 items-center">
                  <Pencil size={16} className="cursor-pointer"/>
                  <Trash size={16} className="cursor-pointer"/>
                </div>  
            </div>
          </div>


          <div className="flex gap-2 justify-between mt-4">

            <div className="flex gap-2 items-center">
              <ListChecks size={18} />
              <p className="text-xs">Tarefas concluidas (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer text-xs h-7"><Trash size={16} /> Limpar tarefas concluidas</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir x itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div className="h-2  bg-blue-500 rounded-md" style={{ width: '50%' }}></div>
          </div>


          <div className="flex justify-end items-center gap-2 mt-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>


        </CardContent>

        <div></div>


      </Card>
    </main>
  )
}

export default Home;