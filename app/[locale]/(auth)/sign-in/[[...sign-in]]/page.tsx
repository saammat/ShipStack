'use client';

import { SignIn } from "@/components/signin/signin";
import { useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignInPage() {
  const t = useTranslations('signin');
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (reason === 'auth') {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [reason]);

  return (
    <>
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-10 left-1/2 z-50 -translate-x-1/2 w-[90%] max-w-md"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>{t('loginRequiredTitle')}</AlertTitle>
              <AlertDescription>{t('loginRequiredDesc')}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <SignIn />
    </>
  )
}