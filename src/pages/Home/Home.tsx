import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

export default function Movies(): JSX.Element {
  const { formatMessage } = useIntl();
  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: 'home.title' })}</title>
      </Helmet>
      <div className="d-flex flex-row justify-content-between px-5 pt-5">
        <h1>
          <FormattedMessage id="home.title" />
        </h1>
      </div>
    </>
  );
}
