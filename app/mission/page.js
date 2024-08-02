import Mission from './Mission';
import { metaData } from '@app/data/metaData';

const MissionPage = () => {
  return (
    <div>
      <head>
        <title>{metaData.ourMission.title}</title>
        <meta name="description" content={metaData.ourMission.description} />
      </head>
      <Mission />
    </div>
  );
};

export default MissionPage;
