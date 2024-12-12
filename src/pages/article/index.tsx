import React, { useEffect, useState } from 'react';
import 'cherry-markdown/dist/cherry-markdown.css';
import Cherry from 'cherry-markdown';
import { Button, Card, Form, Input, Link } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from '@/locale';

import './index.less';
import Topbar from '@/components/TopbarOm';

function Article() {
  const t = useLocale(locale);
  const [formData, setFormData] = useState({});

  const cherryInstance = () => {
    return new Cherry({
      id: 'markdown-container',
      value: '# welcome to cherry editor!',
    });
  };

  useEffect(() => {
    cherryInstance();
  }, []);

  return (
    <div className="base-page">
      <Topbar show={true} />
      <div className='main-container mt80'>
        <div id="markdown-container" />
        <div className='article-operate'>
          <Input />
        </div>
        <div className='article-footer'>
          <Button className='mt20' type='primary'>提交</Button>
        </div>
      </div>
    </div>
  );
}

export default Article;
