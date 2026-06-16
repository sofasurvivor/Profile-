import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-transparent pt-16 pb-8 mt-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          
          <div>
            <Link href="/" className="text-xs font-mono font-bold tracking-[0.2em] text-[#00F0FF] mb-2 inline-block">
              R_MINA // ARCHIVE
            </Link>
            <p className="text-white/40 text-xs font-light max-w-sm">
              ENGINEERING THE FUTURE OF BUSINESS OPERATIONS & AUTONOMOUS AGENT NETWORKS.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-12 text-[10px] font-mono">
            <div className="flex flex-col space-y-1">
              <span className="text-white/20 uppercase tracking-widest mb-1">{"// SOCIAL"}</span>
              <a href="https://www.linkedin.com/in/rahul-m-380344210" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00F0FF] transition-colors py-2 min-h-[44px] flex items-center">
                LINKEDIN
              </a>
              <a href="https://github.com/sofasurvivor" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00F0FF] transition-colors py-2 min-h-[44px] flex items-center">
                GITHUB
              </a>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-white/20 uppercase tracking-widest mb-1">{"// MAP"}</span>
              <Link href="#about" className="text-white/40 hover:text-white transition-colors py-2 min-h-[44px] flex items-center">BACKGROUND</Link>
              <Link href="#projects" className="text-white/40 hover:text-white transition-colors py-2 min-h-[44px] flex items-center">DEPLOYMENTS</Link>
              <a href="mailto:rahulmina72@gmail.com" className="text-white/40 hover:text-[#00F0FF] transition-colors py-2 min-h-[44px] flex items-center">EMAIL_LINK</a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[8px] font-mono text-white/20">
          <p>&copy; {currentYear} R_MINA // ALL REPOSITORIES INCLUDED. SYSTEM SECURED.</p>
          <p className="text-[#00F0FF]/30 select-none uppercase mt-2 md:mt-0 led-indicator">▲ SYS_STATUS: OPERATIONAL_STABLE</p>
        </div>
      </div>
    </footer>
  );
}
