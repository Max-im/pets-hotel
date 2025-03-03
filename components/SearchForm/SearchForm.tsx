import { search } from "@/actions";

export default function SearchForm({value}: {value?: string}) {
  return (
    <form action={search} className="w-full h-full">
      <input
        type="search"
        name="search"
        defaultValue={value}
        placeholder="Search pets"
        className="w-full h-10 px-3 text-base bg-white/70 rounded-lg outline-none focus:bg-white hover:bg-white transition"
      />
    </form>
  )
}
