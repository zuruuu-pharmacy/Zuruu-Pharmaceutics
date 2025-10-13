
import type { Metadata } from 'next';
import './globals.css';
import { ModeProvider } from '@/contexts/mode-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { PatientProvider } from '@/contexts/patient-context';
import { LectureNotesProvider } from '@/contexts/lecture-notes-context';
import { OsceSessionsProvider } from '@/contexts/osce-sessions-context';
import { DiscussionForumProvider } from '@/contexts/discussion-forum-context';
import { PollsProvider } from '@/contexts/polls-context';
import { PathologyProvider } from '@/contexts/pathology-context';

export const metadata: Metadata = {
  title: 'Zuruu Pharmaceutics',
  description: 'Advanced Pharmaceutical Intelligence Platform for industry, hospitals, retail, and academia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <ModeProvider>
              <PatientProvider>
                <LectureNotesProvider>
                  <OsceSessionsProvider>
                    <DiscussionForumProvider>
                      <PollsProvider>
                        <PathologyProvider>
                            {children}
                        </PathologyProvider>
                        <Toaster />
                      </PollsProvider>
                    </DiscussionForumProvider>
                  </OsceSessionsProvider>
                </LectureNotesProvider>
              </PatientProvider>
            </ModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
