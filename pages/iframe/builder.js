import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Builder from '../../lib/builder';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const translate = useTranslations();
  const router = useRouter();

  return (
    <>
      <Builder />
    </>
  );
};

export default Home;

export async function getStaticProps(context) {
  const messages = (await import('/locales/' + context.locale + '.json'))
    .default
  return {
    props: {
      messages,
      ...context,
    },
  }
}
