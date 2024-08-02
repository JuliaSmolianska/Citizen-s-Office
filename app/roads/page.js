import Roads from './Roads';
import { metaData } from '@app/data/metaData';

const RoadsPage = () => {
  return (
    <div>
      <head>
        <title>{metaData.roadMap.title}</title>
        <meta name="description" content={metaData.roadMap.description} />
      </head>
      <Roads />
    </div>
  );
};

export default RoadsPage;