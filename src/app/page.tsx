import { Table } from "./components/Table";

export default async function Home() {
  return (
    <main className="flex flex-col bg-white text-neutral-900 h-screen items-center justify-center">
      <Table />
    </main>
  );
}
