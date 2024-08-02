import Laws from './Laws';
import { metaData } from '@app/data/metaData';

const LawsPage = () => {
  return (
    <div>
      <head>
        <title>{metaData.lawsPage.title}</title>
        <meta name="description" content={metaData.lawsPage.description} />
      </head>
      <Laws />
    </div>
  );
};

export default LawsPage;