"use server"
import {prisma} from "@/utils/prisma";

export const editTask = async (id: string, newTask: string) => {
   try{
     if(!id || !newTask) return

     const editedTask = await prisma.tasks.update({
        where: { id: id },
        data: { task: newTask }
     })

     if(!editedTask) return

   }catch(error){
     throw error
   }
}