import React from 'react';
// import Logo from '@/assets/logo.svg';
import styles from './style/index.module.less';
import { Button, Menu, Space } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from '@/locale';

function Topbar({ show }: { show: boolean }) {
  const t = useLocale(locale);
  if (!show) {
    return <></>;
  }

  return (
    <div className={styles.topbar}>
      <div className={styles['menu-box']}>
        <Menu
          className={styles.menu}
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1">写文章</Menu.Item>
          <Menu.Item key="2">文章列表</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Topbar;
