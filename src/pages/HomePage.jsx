import Subject from "../components/Subject";
import Loading from "../components/Loading";
import { useState, useRef, useEffect } from "react";

const initialSubjects = [
  {
    name: "Matematika",
    description: "Latihan logika dan kemampuan berhitung.",
    day: "Senin dan Rabu",
    image: "/matematika.jpg",
  },
  {
    name: "Desain Grafis",
    description: "Mempelajari dasar visual dan komunikasi desain.",
    day: "Senin",
    image: "/desaingrafis.jpg",
  },
  {
    name: "Seni Budaya",
    description: "Mengenal karya seni dan budaya Indonesia.",
    day: "Senin",
    image: "/senibudaya.jpg",
  },
  {
    name: "Pemrograman Dasar",
    description: "Membangun dasar berpikir komputasional dan pemrograman.",
    day: "Selasa dan Kamis",
    image: "/pemrogramandasar.jpg",
  },
  {
    name: "Muatan Lokal",
    description: "Mempelajari pengetahuan Al-Qur'an",
    day: "Selasa",
    image: "/mulok.jpg",
  },
  {
    name: "Informatika",
    description: "Mengenal teknologi informasi dan sistem komputer.",
    day: "Selasa",
    image: "/informatika.jpg",
  },
  {
    name: "Bahasa Inggris",
    description: "Melatih kemampuan berkomunikasi dalam bahasa Inggris.",
    day: "Rabu dan Jumat",
    image: "/bahasainggris.jpg",
  },
  {
    name: "Pendidikan Agama Islam",
    description: "Mempelajari nilai dan ajaran agama Islam.",
    day: "Rabu",
    image: "/pai.jpg",
  },
  {
    name: "Bahasa Indonesia",
    description: "Mengembangkan kemampuan membaca, menulis, dan berbicara.",
    day: "Rabu dan Kamis",
    image: "/bahasaindonesia.jpg",
  },
  {
    name: "Pendidikan Jasmani, Olahraga, dan Kesehatan",
    description: "Menjaga kebugaran melalui aktivitas olahraga dan kesehatan.",
    day: "Kamis",
    image: "/pendidikanjasmani.jpg",
  },
  {
    name: "Sejarah",
    description: "Memahami peristiwa penting dan perkembangan masyarakat.",
    day: "Kamis",
    image: "/sejarah.jpg",
  },
  {
    name: "Pendidikan Kewarganegaraan",
    description: "Mengenal hak, kewajiban, dan kehidupan berbangsa.",
    day: "Jumat",
    image: "/pancasila.jpg",
  },
  {
    name: "IPA/S",
    description: "Menghubungkan konsep alam dan kehidupan sosial sehari-hari.",
    day: "Rabu dan Jumat",
    image: "/ipas.jpg",
  },
];

function HomePage() {
  const [subjects, setSubjects] = useState([]);
  const dbRef = useRef(null);
  useEffect(() => {
    let request = window.indexedDB.open("data", 3);

    request.onsuccess = (event) => {
      dbRef.current = event.target.result;
      const transaction = dbRef.current.transaction("subjects", "readonly");
      const objectStore = transaction.objectStore("subjects");
      const getRequest = objectStore.getAll();
      getRequest.onsuccess = () => {
        setSubjects(getRequest.result);
      };
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const transaction = event.target.transaction;
      const subjectStore = db.objectStoreNames.contains("subjects")
        ? transaction.objectStore("subjects")
        : db.createObjectStore("subjects", { autoIncrement: true, keyPath: "id" });

      if (event.oldVersion === 0) {
        initialSubjects.forEach((subject) => {
          subjectStore.add(subject);
        });
      } else {
        const getRequest = subjectStore.getAll();
        getRequest.onsuccess = () => {
          getRequest.result.forEach((subject) => {
            const updatedSubject = initialSubjects.find(
              (initialSubject) => initialSubject.name === subject.name,
            );

            if (updatedSubject) {
              subjectStore.put({ ...subject, image: updatedSubject.image });
            }
          });
        };
      }
    };

    request.onerror = (event) => {
      console.error("Gagal membuka database:", event.target.error);
    };

    // Fungsi cleanup yang benar untuk IndexedDB
    return () => {
      if (dbRef.current) {
        dbRef.current.close(); 
        dbRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-100 to-violet-200 px-7 py-14 max-w-175">
      <main>
        <header>
          <span className="text-fuchsia-900/40  text-2xl mt-3  font-fredoka">
            Senin . 14 Juli 2026
          </span>
          <h1 className="font-fredoka text-5xl text-fuchsia-950 mt-2">
            Kerjakan tugas anda.{" "}
          </h1>
        </header>
        <div className="mt-5">
          <div></div>
          <section className="mt-3">
            <h2 className="text-fuchsia-900/40  text-lg mt-3  font-fredoka">
              Lanjutkan tugas
            </h2>
            <div className="mt-3 flex flex-col gap-4">
              {subjects.length !== 0 ? (
                subjects.map((subject, index) => {
                  return <Subject subject={subject}  key={index}/>;
                })
              ) : (
                <Loading />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
