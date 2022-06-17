import Navigation from "./components/Navigation";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col justify-start h-screen text-center">
      <Header />

      <main className="mb-auto text-rose-500 uppercase shadow-md">Joel cute kaayo</main>
      <Navigation />
    </div>
  );
}
