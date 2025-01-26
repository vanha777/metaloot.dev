export default function GameSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Game Management</h2>
        <div className="flex gap-4">
          <button className="bg-[#14F195] text-[#071A2F] px-6 py-3 rounded-lg font-bold">
            Create New Game
          </button>
          <button className="bg-[#0CC0DF] text-[#071A2F] px-6 py-3 rounded-lg font-bold ml-4">
            Update Game Info
          </button>
        </div>
      </div>

      <div className="space-y-4"></div>
    </div>
  );
}
