"use server"

import {prisma} from "@/utils/prisma";

const getTask = async () => {

   try{
        const tasks = await prisma.tasks.findMany();

        if(!tasks) return

        console.log(tasks)
        return tasks

   }catch(error){
        throw error
   }

}

export default getTask;