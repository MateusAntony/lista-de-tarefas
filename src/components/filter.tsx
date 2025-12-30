import { Check, List, SquareX } from "lucide-react";
import { Badge } from "./ui/badge";

type FilterProps = {
    currentFilter: string;
    setCurrentFilter: (filter: string) => void;
}

const Filter= ({currentFilter,setCurrentFilter}: FilterProps) =>{
    return(
        <div className="flex gap-2">
            <Badge  className="cursor-pointer" variant={`${currentFilter === "all" ? "default" : "outline"}`} onClick={() => setCurrentFilter("all")}>  <List /> Todos</Badge>
            <Badge  className="cursor-pointer" variant={`${currentFilter === "pending" ? "default" : "outline"}`} onClick={() => setCurrentFilter("pending")}> <SquareX/> Não finalizados</Badge>
            <Badge  className="cursor-pointer" variant={`${currentFilter === "completed" ? "default" : "outline"}`} onClick={() => setCurrentFilter("completed")}> <Check/> Concluidas</Badge>
        </div>

    )
}

export default Filter;