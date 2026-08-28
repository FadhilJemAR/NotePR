import { ArrowLeft, CalendarDays, Circle, Plus, X } from "lucide-react";
import { useState,useEffect,useRef } from "react";
import { useNavigate, useParams } from "react-router";


function TasksPage() {
    const navigate = useNavigate();
    const dbRef = useRef(null);
    const { subjectName } = useParams();
    const [subjectData,setSubjectData] = useState({name:"",day:"",description:"",image:"",tasks:[]})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        deadline: "",
    });
    const tasks = subjectData.tasks;

    useEffect(()=>{
        const request = window.indexedDB.open("data");
        request.onsuccess = (event) => {
            dbRef.current = event.target.result;
            const transaction = dbRef.current.transaction("subjects","readonly");
            const objectStore = transaction.objectStore("subjects");
            const getRequest = objectStore.get(subjectName);
            getRequest.onsuccess = (event) => {
               const result = event.target.result;
               setSubjectData(result);
            }

        }
    },[])

    function handleFormChange(event) {
        const { name, value } = event.target;
        setForm((currentForm) => ({ ...currentForm, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newTasks = [
            ...tasks,
            {
                ...form,
                status: "Belum dikerjakan",
            }
        ]
        const transaction = dbRef.current.transaction("subjects","readwrite");
        const objectStore = transaction.objectStore("subjects");
        const requestPut  =  objectStore.put({...subjectData,tasks:newTasks},subjectName);
        requestPut.onsuccess = ()=>{
            setSubjectData({...subjectData,tasks:newTasks});
            setForm({ title: "", description: "", deadline: "" });
            setIsModalOpen(false);
        }
    }

    return (
        <main className="min-h-screen bg-linear-to-b from-pink-100 to-violet-200 px-7 py-14 max-w-175">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-fuchsia-900/70 font-fredoka"
            >
                <ArrowLeft size={20} />
                Kembali
            </button>

            <header className="mt-8">
                <span className="text-fuchsia-900/40 text-lg font-fredoka">
                    Daftar tugas
                </span>
                <h1 className="text-fuchsia-950 text-4xl font-fredoka mt-1">
                    {subjectName}
                </h1>
            </header>

            <section className={`${!tasks.length && "items-center justify-center "} mt-7 gap-4 flex flex-col min-h-[50vh]`}>
                {tasks.length?   
                 tasks.map((task) => (
                    <article
                        key={task.title}
                        className="bg-white rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-fuchsia-950 text-xl font-fredoka">
                                    {task.title}
                                </h2>
                                <p className="text-fuchsia-900/60 font-roboto mt-2">
                                    {task.description}
                                </p>
                            </div>
                            <Circle className="text-fuchsia-300 shrink-0" size={18} />
                        </div>
                        <div className="flex items-center gap-2 text-fuchsia-900/70 font-fredoka mt-4 text-sm">
                            <CalendarDays size={18} />
                            {task.deadline}
                        </div>
                        <span className="inline-block bg-fuchsia-100 text-fuchsia-900 rounded-full px-3 py-1 mt-3 text-sm font-fredoka">
                            {task.status}
                        </span>
                    </article>
                )) : (
                    <span className="text-xl text-fuchsia-900/60 font-fredoka">Belum ada tugas</span>
                )
                }
            </section>
            <button
                type="button"
                aria-label="Tambah tugas"
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-7 right-7 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-700 text-white shadow-lg transition hover:bg-fuchsia-800 focus:outline-none focus:ring-4 focus:ring-fuchsia-300"
            >
                <Plus size={28} />
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-10 flex items-center justify-center bg-fuchsia-950/30 px-5"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-task-title"
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <h2 id="add-task-title" className="text-2xl font-fredoka text-fuchsia-950">
                                Tambah tugas
                            </h2>
                            <button
                                type="button"
                                aria-label="Tutup modal"
                                onClick={() => setIsModalOpen(false)}
                                className="text-fuchsia-900/60 transition hover:text-fuchsia-950"
                            >
                                <X size={22} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                            <label className="flex flex-col gap-1 text-sm font-fredoka text-fuchsia-950">
                                Judul tugas
                                <input
                                    required
                                    name="title"
                                    value={form.title}
                                    onChange={handleFormChange}
                                    className="rounded-lg border border-fuchsia-200 px-3 py-2 font-roboto outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                                />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-fredoka text-fuchsia-950">
                                Deskripsi
                                <textarea
                                    required
                                    name="description"
                                    value={form.description}
                                    onChange={handleFormChange}
                                    rows="3"
                                    className="resize-none rounded-lg border border-fuchsia-200 px-3 py-2 font-roboto outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                                />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-fredoka text-fuchsia-950">
                                Hari dikumpulkan
                                <input
                                    required
                                    name="deadline"
                                    value={form.deadline}
                                    onChange={handleFormChange}
                                    placeholder="Contoh: Jumat"
                                    className="rounded-lg border border-fuchsia-200 px-3 py-2 font-roboto outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                                />
                            </label>
                            <button
                                type="submit"
                                className="mt-2 rounded-lg bg-fuchsia-700 px-4 py-2.5 font-fredoka text-white transition hover:bg-fuchsia-800"
                            >
                                Simpan tugas
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

export default TasksPage;