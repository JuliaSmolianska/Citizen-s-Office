import Privacy from './Privacy';
import { metaData } from '@app/data/metaData';

const PrivacyPage = () => {
  return (
    <div>
      <head>
        <title>{metaData.privacyPolicy.title}</title>
        <meta name="description" content={metaData.privacyPolicy.description} />
      </head>
      <Privacy />
    </div>
  );
};

export default PrivacyPage;