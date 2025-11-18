export const FooterSection = () =>{

    return (
        <>
     <footer className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-gray-200 dark:border-gray-700/40
      rounded-2xl shadow backdrop-blur-xl p-6 flex flex-col md:flex-row justify-between text-center transition-colors py-12 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-300 px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <div>
              <p className="text-lg font-semibold">AI Expense Tracker</p>
              <p className="mt-2 text-sm">Made with ❤️ to help you spend smarter.</p>
            </div>

            <div className="flex gap-4 items-center">
              <a href="#" className="text-sm hover:underline">Privacy</a>
              <a href="#" className="text-sm hover:underline">Terms</a>
              <a href="#" className="text-sm hover:underline">Contact</a>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
      </>
    );
}      