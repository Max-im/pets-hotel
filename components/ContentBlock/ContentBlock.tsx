export default function ContentBlock({children}: {children: React.ReactNode}) {

  return (
    <div className="bg-gray-50 shadow-sm overflow-hidden rounded-md h-full w-full">
      {children}
    </div>
  )
}
