export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 sm:py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>Made with ❤️ from</span>
          <a 
            href="https://matha-charan-portfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold inline-flex items-center gap-1 hover:text-blue-400 transition-colors"
          >
            _matha_charan_
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  )
}
