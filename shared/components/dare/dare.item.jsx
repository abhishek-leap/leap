import React, { useEffect } from "react";

import { DARE_STATE } from '../../constants';
import withAuthentication from '../../hoc/withAuthentication';
import Preview from "./dare.preview";
import DareSeparator from "./dare.separator";
import { handlePush } from "../../navigation/navigationService";

const DareItem = ({
  dare,
  dareState,
  source,
}) => {

  const skill = dare?.skills?.length ? dare.skills[0].alias : "";

  useEffect(() => {
    if (dare) {
      setTimeout(() => {
        const state = DARE_STATE.FIRST_ASSET;
        if (dareState === DARE_STATE.PREVIEW)
          if (source === "bar") {
            handlePush({name: 'DareVideo', params: {dare, dareState, source, stage: state}})
          } else {
            // router.push(`/dare/${dare.id}?stage=${state}`);
          }
      }, 3000);
    }
  }, [dare]);

  return (
    <Preview
      seprator={
        <DareSeparator
          title={skill}
          subTitle={dare?.title}
          dareState={DARE_STATE.PREVIEW}
        />
      }
      firstVideoDareCover={dare?.assets?.[0]?.dareCover}
      secondVideoDareCover={dare?.assets?.[1]?.dareCover}
    />
  );
};

export default withAuthentication(DareItem);