function MenuItem() {
  return (
    <div
        className="flex flex-col gap-y-6 items-center h-fit w-full bg-zinc-800 rounded-lg p-4 hover:ring-2 hover:ring-[#1F8B96] transition-all duration-300 cursor-pointer" 
    >
        <img 
            src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Menu Item"
            className="w-32 h-32 rounded-full shadow-lg object-cover ring"
        />
        <div className='w-full h-fit'>
            <h4 className=''>Filé de frango</h4>
            <p className='text-sm text-gray-500'>R$ 25,00</p>
        </div>
    </div>
  )
}

export default MenuItem