import React, { useEffect, useState } from 'react';
// import Logo from '@/assets/logo.svg';
import styles from './style/index.module.less';
import { Button, Menu } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import useLocale from '@/utils/useLocale';
import locale from '@/locale';
// import SendMailModal from '@/pages/home/SendMailModal';

function Topbar({ show }: { show: boolean }) {
  const t = useLocale(locale);
  const history = useHistory();

  const [scrolled, setScrolled] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['Home']);
  const [visible, setVisible] = useState(false);

  // 滚动事件处理函数
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 180) {
      setScrolled(true); // 如果滚动超过60px，则更新状态
    } else {
      setScrolled(false); // 否则恢复为初始状态
    }
  };

  useEffect(() => {
    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 组件卸载时移除监听器
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!show) {
    return <></>;
  }

  return (
    <div className={`${styles.topbar} ${scrolled ? styles['topbar-bg'] : ''}`}>
      <div className={styles['menu-box']}>
        <Menu
          className={styles.menu}
          mode="horizontal"
          defaultSelectedKeys={['Home']}
          selectedKeys={selectedKeys}
          onClickMenuItem={(value) => {
            console.log('value', value);
            if (value === 'Home') {
              setSelectedKeys([`Home`]);
              history.push(`/home`);
            }
            if (value === 'ABOUT US') {
              setSelectedKeys([`ABOUT US`]);
              history.push(`/home#WHOWEARE`);
            }
            if (value === 'SERVICES') {
              setSelectedKeys([`SERVICES`]);
              history.push(`/home#SERVICES`);
            }
            if (value === 'PRODUCTS') {
              setSelectedKeys([`PRODUCTS`]);
              history.push(`/products`);
            }
            if (value === 'CONtACT US') {
              // 打开弹出框
              setVisible(true);
            }
          }}
        >
          <Menu.Item key="Home">{t['Home']}</Menu.Item>
          <Menu.Item key="ABOUT US">{t['ABOUT US']}</Menu.Item>
          <Menu.Item key="SERVICES">{t['SERVICES']}</Menu.Item>
          <Menu.Item key="PRODUCTS">{t['PRODUCTS']}</Menu.Item>
          <Menu.Item key="CONtACT US">{t['CONtACT US']}</Menu.Item>
          <Menu.Item key="XXX"><Button>Q And A</Button></Menu.Item>
        </Menu>
      </div>
      {/* <SendMailModal visible={visible} setVisible={setVisible} /> */}
    </div>
  );
}

export default Topbar;
