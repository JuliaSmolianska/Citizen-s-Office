import Terms from './Terms';
import { metaData } from '@app/data/metaData';

const TermsPage = () => {
  return (
    <div>
      <head>
        <title>{metaData.termsPage.title}</title>
        <meta name="description" content={metaData.termsPage.description} />
      </head>
      <Terms />
    </div>
  );
};

export default TermsPage;