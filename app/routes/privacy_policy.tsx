import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DarkModeToggle from '~/components/DarkModeToggle';

function PrivacyPolicy() {
    const [file, setFile] = useState<string>();

    async function fetchFile() {
        fetch('/privacy_policy.md')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then((text) => {
            setFile(text);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    useEffect(() => {
        fetchFile();
    }, []);

  return (
    <main className='bg-background-900'>
        <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col gap-y-8'>
            <nav className="flex items-center justify-between p-2 px-4">
                <div className="flex items-center gap-x-6">
                    <img src="/icon.png" alt="Logo" className="h-14 w-14" />
                </div>
                <div className="flex items-center gap-x-6">
                    <DarkModeToggle />
                </div>
            </nav>
            <div className='prose lg:prose-xl'>
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    h1: ({node, ...props}) => <h1 className='text-3xl font-bold text-text-50' {...props} />,
                    h2: ({node, ...props}) => <h2 className='text-2xl font-bold text-text-50' {...props} />,
                    h3: ({node, ...props}) => <h3 className='text-xl font-bold text-text-50' {...props} />,
                    p: ({node, ...props}) => <p className='text-base text-text-400' {...props} />,
                    li: ({node, ...props}) => <li className='text-base text-text-400' {...props} />,
                    strong: ({node, ...props}) => <strong className='text-base font-bold text-text-50' {...props} />,
                }}>
                    {file}
                </Markdown>
            </div>
        </div>
    </main>
  )
}

export default PrivacyPolicy