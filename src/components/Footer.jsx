import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Footer() {

    return (
        <footer className="border-t border-border/50">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
                <p className="font-mono text-xs text-zinc-500">
                   &#169; {new Date().getFullYear()} Emilis Voropajevas.
                </p>
                <div className="flex items-center gap-4 text-zinc-500">
                    <a href='https://github.com/emilisvoropajevas' target='_blank' rel='noopener noreferrer' className='transition-colors hover:text-zinc-100'>
                    <FaGithub className='h-4 w-4'/></a>
                    <a href='https://www.linkedin.com/in/emilisvoropajevas/' target='_blank' rel='noopener noreferrer' className='transition-colors hover:text-zinc-100'>
                    <FaLinkedin className='h-4 w-4'/></a>
                </div>
            </div>
        </footer>
    )
}
