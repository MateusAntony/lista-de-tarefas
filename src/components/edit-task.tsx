import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tasks } from "@/generated/prisma/client";
import { useState } from "react";
import { editTask } from "@/actions/edit-task";
import { toast } from "sonner";


type TaskProps = {
    task: Tasks
    handleGetTasks: () => void
}


const EditTask = ({task,handleGetTasks}: TaskProps,) => {

    const [editedTask,setEditedTask]= useState(task.task)

    const handleEditTask = async () => {

        try{
            if(task.task === editedTask) return
            await editTask(task.id,editedTask)
            toast.success("Tarefa editada com sucesso!")
            handleGetTasks()
        }catch(error){
            throw error
        }
    }



    return(

        <Dialog>
            <DialogTrigger asChild>
                <Pencil size={16} className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Editar tarefa</DialogTitle>
                </DialogHeader>

                <div className="flex gap-2">

                <Input placeholder="Editar da tarefa" value={editedTask} onChange={(e) => setEditedTask(e.target.value)}/>
                <DialogClose asChild>

                <Button className="cursor-pointer" onClick={handleEditTask}> Salvar</Button>

                </DialogClose>
                </div>

            </DialogContent>
        </Dialog>

    )
}

export default EditTask;