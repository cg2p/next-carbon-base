import React, { useState } from 'react';
// import ShowsTable from './ShowsTable';

import {
  Grid,
  Column
} from '@carbon/react';

import { Globe, Application, PersonFavorite } from '@carbon/react/icons';

import { InfoCard, InfoSection } from '@/src/components/Info';

function ShowsPageContent({ shows }) {
  
  return (
  <Grid>
    <Column lg={16} md={8} sm={4} className="landing-page__r3">
        <InfoSection heading="Batman" className="landing-page__r3">
          {shows.map(({ show }) => (
            <InfoCard
              heading={show.name}
              body={show.summary}
              icon={() => <PersonFavorite size={32} />}
              />
          ))}
        </InfoSection>
      </Column>
    </Grid>
);
}

export default ShowsPageContent;

/*
    <div>
    <ul>
    {shows.map(({show}) => (
      <li key={show.id}>
          <a>{show.name}</a>
      </li>
    ))}
  </ul>
  </div>

*/