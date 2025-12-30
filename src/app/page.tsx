"use client"

import { Button } from "@/components/ui/button"
import { Card,CardHeader,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus,Trash,ListChecks,Sigma,LoaderCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import EditTask from "@/components/edit-task";
import getTasks from "@/actions/get-tasks-from-bd";
import { Tasks } from "@/generated/prisma/client"; 
import { useState } from "react";
import { useEffect,useMemo  } from "react";
import {addTask} from "@/actions/add-task";
import {deleteTask} from "@/actions/delete-task";
import {toast} from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import Filter from "@/components/filter";
import { deletedCompletedTask } from "@/actions/clear-completed-task";
const Home = () => {

  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task,setTask] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);
  const [currentFilter,setCurrentFilter] = useState("all");



  const handleGetTasks = async () => {
        const tasks = await getTasks();
        if (tasks) setTaskList(tasks);
      };
  

  const handleAddTask = async () => {
    setLoading(true)
    if(task.length === 0 || !task) {
      toast.error("Insira uma atividade")
      return
    }
    const newTask = await addTask(task);
    if (!newTask) return

    setTask("")

    handleGetTasks()
    toast.success("Tarefa adicionada com sucesso!")

    setLoading(false)
  } 

  const handleDeleteTask = async (id: string) => {
    try{

      if(!id) return;
      const deletedTask = await deleteTask(id);
      if (!deletedTask) return
      handleGetTasks()
      toast.info("Tarefa deletada com sucesso!")

    }catch(error){
      throw error
    }
    
  }

  const handleToggleTask = async (id: string) =>{

    const previousTasks = [...taskList]

    try{
      setTaskList((prev) =>{

      const updatedTaskList= prev.map(task => {
        if(task.id === id){
          return {
            ...task,
            done: !task.done
          }
        }else{
          return task
        }
            })
      return updatedTaskList
    } )

    const getFromDb= await updateTaskStatus(id);
  }catch(error){
    setTaskList(previousTasks)
    throw error
  }

    }

  const clearCompletedTask = async () => {
    
    const deletedTasks = await deletedCompletedTask();
    if(!deletedTasks) return
    handleGetTasks()
    toast.success("Tarefas concluidas deletadas com sucesso!")

  }
  
  useEffect(() => {
  const handleGetTasks = async () => {
        const tasks = await getTasks();
        if (tasks) setTaskList(tasks);
      };

  handleGetTasks()
  }, []);

  const filteredTasks = useMemo(() => {
  switch (currentFilter) {
    case "pending":
      return taskList.filter(task => !task.done);
    case "completed":
      return taskList.filter(task => task.done);
    default:
      return taskList;
  }
}, [taskList, currentFilter]);


  return(
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center" >
      
      
      <Card className="w-lg">
        <CardHeader className= "flex gap-2">
          <Input placeholder="Adicionar tarefa" onChange={(e) => setTask(e.target.value)} value={task}/>
          <Button  className= "cursor-pointer" onClick={handleAddTask}> 
            {loading ? <LoaderCircle className="animate-spin"/> : <Plus />}
            Cadastrar</Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4"/>

           <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}/>

          <div className="mt-4 border-b-1">

            

            {taskList.length === 0 && <p className="text-xs border-t-1 py-4"> Você não possui atividades cadastradas</p>}

            {filteredTasks.map((task) => (
              <div className="flex justify-between h-14 items-center border-t-1" key={task.id}>
                <div className={`${task.done === true ? 'w-2 h-full bg-green-300':'w-2 h-full bg-red-300'}`}></div>
                <p className="flex-1 px-2 text-sm cursor-pointer" onClick={() => handleToggleTask(task.id)} >{task.task}</p>
                <div className="flex gap-2 items-center">

                  <EditTask task={task} handleGetTasks={handleGetTasks}/>

                  <Trash size={16} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/>
                </div>  
              </div>
            ))}
            
          </div>


          <div className="flex gap-2 justify-between mt-4">

            <div className="flex gap-2 items-center">
              <ListChecks size={18} />
              <p className="text-xs">Tarefas concluidas ({filteredTasks.filter(task => task.done).length}/{taskList.length})</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer text-xs h-7"><Trash size={16} /> Limpar tarefas concluidas</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir {taskList.length} itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="cursor-pointer" onClick={clearCompletedTask}>Sim</AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div className="h-2  bg-blue-500 rounded-md" style={{ width: `${filteredTasks.filter(task => task.done).length / (taskList.length || 1) * 100}%` }}></div>
          </div>


          <div className="flex justify-end items-center gap-2 mt-2">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>


        </CardContent>

        <div></div>


      </Card>
    </main>
  )
}

export default Home;