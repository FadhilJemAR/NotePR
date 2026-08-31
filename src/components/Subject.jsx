import { CalendarClock, ArrowRight , ListTodo, List} from "lucide-react";
import { useNavigate } from "react-router";

function Subject({ subject }) {
  const navigate = useNavigate();

  return (
    <article className="bg-white rounded-2xl overflow-hidden">
      <header>
        <img
          className="max-h-40  w-full object-cover"
          src={subject.image}
        ></img>
        <h3 className="text-fuchsia-900 font-fredoka text-2xl p-4 pb-0">
          {subject.name}
        </h3>
      </header>
      <div className="p-4 pt-0">
        <p className="text-fuchsia-900/60 font-roboto ">
          {subject.description}
        </p>
        <div className="flex gap-8 text-fuchsia-900 font-fredoka mt-2">
          <div className="flex gap-2">
            <CalendarClock />
            {subject.day}
          </div>
          <div className="flex gap-2">
             <ListTodo/>
             {subject.tasks.length + " Tugas "}
          </div>
        </div>
        <button
          onClick={() => navigate(`/tasks/${subject.name}`)}
          className="w-full bg-linear-to-r from-fuchsia-200 to-fuchsia-100   text-fuchsia-900 font-fredoka rounded-full p-2 mt-2 flex gap-2 justify-center"
        >
          <span>Lihat tugas</span>
          <ArrowRight />
        </button>
      </div>
    </article>
  );
}

export default Subject;
