
// import { usePathname } from "next/navigation";

export default function SearchForm() {

  return (
    <form className="w-full h-full">
      <input type="text" placeholder="Search" className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" />
    </form>
  )
}
