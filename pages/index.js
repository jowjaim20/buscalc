import Navigation from "./components/Navigation";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col justify-start h-screen">
      <Header />
      <main className="mb-auto">main</main>
      <Navigation />
    </div>
  );
}
