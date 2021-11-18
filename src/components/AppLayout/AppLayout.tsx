import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';
import styles from './AppLayout.module.scss';

export default function AppLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <header
        role="banner"
        className={classnames(styles.header, 'flex-row', 'justify-content-between', 'py-2', 'px-4', 'border-bottom')}
      >
        JUDG
      </header>
      <main role="main">{children}</main>
    </>
  );
}
